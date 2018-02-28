/*
 *  V4L2 video capture example
 *
 *  This program can be used and distributed without restrictions.
 *
 *      This program is provided with the V4L2 API
 * see http://linuxtv.org/docs.php for more information
 *
 * To build:
 *   g++ -std=c++11 -o v4l2-capture v4l2-capture.cpp
 */

#include <iostream>
#include <vector>

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <assert.h>

#include <getopt.h>             /* getopt_long() */

#include <fcntl.h>              /* low-level i/o */
#include <unistd.h>
#include <errno.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <sys/time.h>
#include <sys/mman.h>
#include <sys/ioctl.h>
#include <time.h>

#include "image.h"
#include <cstdio>
#include <string>

#include <linux/limits.h>
#include <linux/videodev2.h>

using namespace std;
using namespace ComputerVisionProjects;

#define CLEAR(x) memset(&(x), 0, sizeof(x))

struct buffer_t {
    void   *start;
    size_t  length;
};

static const char      *dev_name;
static int              fd = -1;
static vector<buffer_t> buffers;
static int              frame_count = 1000;
static int              frame_number = 0;

static string output_name = "test.pgm";
static string change_name = "test_out.pgm";
static int req_width = 320;
static int req_height = 240;
static int req_format = V4L2_PIX_FMT_GREY;
static int req_rate_numerator   = 20;
static int req_rate_denominator = 1;

time_t startTime = 0, endTime = 0;

int convertHough(){
  const string input_file(output_name);
  const string output_file(change_name);

  Image an_image;

  //if (!ReadImage(input_file, &an_image, req_width, req_height)) {
  if (!ReadImage(input_file, &an_image)) {
    cout <<"Can't open file " << input_file << endl;
    return 0;
  }

  LocateEdges(&an_image);

  if (!WriteImage(output_file, an_image)){
    cout << "Can't write to file " << output_file << endl;
    return 0;
  }
}
 

static void errno_exit(const char *s)
{
    fprintf(stderr, "%s error %d, %s\n", s, errno, strerror(errno));
    exit(EXIT_FAILURE);
}

static int xioctl(int fh, int request, void *arg)
{
    int r;

    do {
        r = ioctl(fh, request, arg);
    } while (-1 == r && EINTR == errno);

    return r;
}

static void process_image(const void *p, int size)
{
    frame_number++;
    char filename[PATH_MAX];
    snprintf(filename, PATH_MAX-1, output_name.c_str(), frame_number);
    FILE *fp = fopen(filename,"wb");

    
    // Write the header.
    fprintf(fp, "P5\n"); // Magic number.
    fprintf(fp, "#\n");  // Empty comment.
    fprintf(fp, "%d %d\n%03d\n", 320, 240, 255);
    cout << frame_number << endl;

    if (fp) {
        fwrite(p, size, 1, fp);
        fflush(fp);
        fclose(fp);
    } else {
        errno_exit("process_image");
    }
}

static int read_frame(void)
{
    struct v4l2_buffer buf;
    unsigned int i;

    CLEAR(buf);

    buf.type = V4L2_BUF_TYPE_VIDEO_CAPTURE;
    buf.memory = V4L2_MEMORY_MMAP;

    if (-1 == xioctl(fd, VIDIOC_DQBUF, &buf)) {
        switch (errno) {
            case EAGAIN:
                return 0;
             case EIO:
                /* Could ignore EIO, see spec. */
                /* fall through */
             default:
                errno_exit("VIDIOC_DQBUF");
        }
    }

    assert(buf.index < buffers.size());
    process_image(buffers[buf.index].start, buf.bytesused);

    if (-1 == xioctl(fd, VIDIOC_QBUF, &buf))
            errno_exit("VIDIOC_QBUF");

    return 1;
}

static void mainloop(void)
{
    unsigned int count;

    count = frame_count;

    while (count-- > 0) {
        for (;;) {
            fd_set fds;
            struct timeval tv;
            int r;

            FD_ZERO(&fds);
            FD_SET(fd, &fds);

            /* Timeout. */
            tv.tv_sec = 2;
            tv.tv_usec = 0;

            r = select(fd + 1, &fds, NULL, NULL, &tv);

            if (-1 == r) {
                if (EINTR == errno)
                    continue;
                errno_exit("select");
            }

            if (0 == r) {
                fprintf(stderr, "select timeout\n");
                exit(EXIT_FAILURE);
            }

            // Time check
            startTime = clock();

            read_frame();
            convertHough();

            // Time check end;
	        endTime = clock();
    	    float gap = (float)(endTime - startTime)/(CLOCKS_PER_SEC);
        	printf("시간 : %f sec \n", gap);

          
            break;
        }
    }
}

static void stop_capturing(void)
{
    enum v4l2_buf_type type;

    type = V4L2_BUF_TYPE_VIDEO_CAPTURE;
    if (-1 == xioctl(fd, VIDIOC_STREAMOFF, &type))
        errno_exit("VIDIOC_STREAMOFF");

}

static void start_capturing(void)
{
        unsigned int i;
        enum v4l2_buf_type type;

        for (i = 0; i < buffers.size(); ++i) {
            struct v4l2_buffer buf;

            CLEAR(buf);
            buf.type = V4L2_BUF_TYPE_VIDEO_CAPTURE;
            buf.memory = V4L2_MEMORY_MMAP;
            buf.index = i;

            if (-1 == xioctl(fd, VIDIOC_QBUF, &buf))
                errno_exit("VIDIOC_QBUF");
        }
        type = V4L2_BUF_TYPE_VIDEO_CAPTURE;
        if (-1 == xioctl(fd, VIDIOC_STREAMON, &type))
            errno_exit("VIDIOC_STREAMON");
}

static void uninit_device(void)
{
    unsigned int i;

    for (i = 0; i < buffers.size(); ++i)
        if (-1 == munmap(buffers[i].start, buffers[i].length))
            errno_exit("munmap");

    buffers.clear();
}


static void init_mmap(void)
{
    struct v4l2_requestbuffers req;

    CLEAR(req);

    req.count = 4;
    req.type = V4L2_BUF_TYPE_VIDEO_CAPTURE;
    req.memory = V4L2_MEMORY_MMAP;

    if (-1 == xioctl(fd, VIDIOC_REQBUFS, &req)) {
        if (EINVAL == errno) {
            fprintf(stderr, "%s does not support "
                    "memory mapping\n", dev_name);
            exit(EXIT_FAILURE);
        } else {
            errno_exit("VIDIOC_REQBUFS");
        }
    }

    if (req.count < 2) {
        fprintf(stderr, "Insufficient buffer memory on %s\n",
                 dev_name);
        exit(EXIT_FAILURE);
    }

    buffers.resize(req.count);

    for (size_t idx = 0; idx < buffers.size(); ++idx) {
        struct v4l2_buffer buf;

        CLEAR(buf);

        buf.type        = V4L2_BUF_TYPE_VIDEO_CAPTURE;
        buf.memory      = V4L2_MEMORY_MMAP;
        buf.index       = idx;

        if (-1 == xioctl(fd, VIDIOC_QUERYBUF, &buf))
            errno_exit("VIDIOC_QUERYBUF");

        buffers[idx].length = buf.length;
        buffers[idx].start =
                mmap(nullptr /* start anywhere */,
                     buf.length,
                     PROT_READ | PROT_WRITE /* required */,
                     MAP_SHARED /* recommended */,
                     fd, buf.m.offset);

        if (MAP_FAILED == buffers[idx].start)
            errno_exit("mmap");
    }
}


static void init_device(void)
{
    struct v4l2_capability cap;
    struct v4l2_cropcap cropcap;
    struct v4l2_crop crop;
    struct v4l2_format fmt;
    struct v4l2_streamparm streamparm;
    unsigned int min;

    if (-1 == xioctl(fd, VIDIOC_QUERYCAP, &cap)) {
        if (EINVAL == errno) {
            fprintf(stderr, "%s is no V4L2 device\n",
                     dev_name);
            exit(EXIT_FAILURE);
        } else {
            errno_exit("VIDIOC_QUERYCAP");
        }
    }

    if (!(cap.capabilities & V4L2_CAP_VIDEO_CAPTURE)) {
        fprintf(stderr, "%s is no video capture device\n",
                 dev_name);
        exit(EXIT_FAILURE);
    }

    if (!(cap.capabilities & V4L2_CAP_STREAMING)) {
        fprintf(stderr, "%s does not support streaming i/o\n",
                 dev_name);
        exit(EXIT_FAILURE);
    }


    /* Select video input, video standard and tune here. */

#if 0
    CLEAR(cropcap);

    cropcap.type = V4L2_BUF_TYPE_VIDEO_CAPTURE;

    if (0 == xioctl(fd, VIDIOC_CROPCAP, &cropcap)) {
        crop.type = V4L2_BUF_TYPE_VIDEO_CAPTURE;
        crop.c = cropcap.defrect; /* reset to default */

        if (-1 == xioctl(fd, VIDIOC_S_CROP, &crop)) {
            switch (errno) {
                case EINVAL:
                    /* Cropping not supported. */
                    break;
                default:
                    /* Errors ignored. */
                    break;
            }
        }
    } else {
            /* Errors ignored. */
    }
#endif

    CLEAR(streamparm);

    streamparm.type = V4L2_BUF_TYPE_VIDEO_CAPTURE;

    if (-1 == xioctl(fd, VIDIOC_G_PARM, &streamparm))
        errno_exit("VIDIOC_G_PARM");

    if (streamparm.parm.capture.capability & V4L2_CAP_TIMEPERFRAME) {
        auto &tpf = streamparm.parm.capture.timeperframe;

        // Swap numerator and denominator: rate is an inverted frame time :-)
        tpf.numerator = req_rate_denominator;
        tpf.denominator = req_rate_numerator;

        if (-1 == xioctl(fd, VIDIOC_S_PARM, &streamparm))
            errno_exit("VIDIOC_S_PARM");

        if (tpf.numerator != req_rate_denominator ||
            tpf.denominator != req_rate_numerator) {
            fprintf(stderr,
                   "the driver changed the time per frame from "
                   "%d/%d to %d/%d\n",
                   req_rate_denominator, req_rate_numerator,
                   tpf.numerator, tpf.denominator);
        }
    } else {
        fprintf(stderr, "the driver does not allow to change time per frame\n");
    }


    CLEAR(fmt);

    fmt.type = V4L2_BUF_TYPE_VIDEO_CAPTURE;

    if (true) {

        fmt.fmt.pix.width       = req_width; //replace
        fmt.fmt.pix.height      = req_height; //replace
        fmt.fmt.pix.pixelformat = req_format; //replace
        fmt.fmt.pix.field       = V4L2_FIELD_ANY;

        if (-1 == xioctl(fd, VIDIOC_S_FMT, &fmt))
                errno_exit("VIDIOC_S_FMT");

        /* Note VIDIOC_S_FMT may change width and height. */
    } else {
        /* Preserve original settings as set by v4l2-ctl for example */
        if (-1 == xioctl(fd, VIDIOC_G_FMT, &fmt))
                errno_exit("VIDIOC_G_FMT");
    }

    /* Buggy driver paranoia. */
    min = fmt.fmt.pix.width * 2;
    if (fmt.fmt.pix.bytesperline < min)
            fmt.fmt.pix.bytesperline = min;
    min = fmt.fmt.pix.bytesperline * fmt.fmt.pix.height;
    if (fmt.fmt.pix.sizeimage < min)
            fmt.fmt.pix.sizeimage = min;

    // Last step, init buffers
    init_mmap();
}

static void close_device(void)
{
    if (-1 == close(fd))
        errno_exit("close");

    fd = -1;
}

static void open_device(void)
{
    struct stat st;

    if (-1 == stat(dev_name, &st)) {
        fprintf(stderr, "Cannot identify '%s': %d, %s\n",
                 dev_name, errno, strerror(errno));
        exit(EXIT_FAILURE);
    }

    if (!S_ISCHR(st.st_mode)) {
        fprintf(stderr, "%s is no device\n", dev_name);
        exit(EXIT_FAILURE);
    }

    fd = open(dev_name, O_RDWR /* required */ | O_NONBLOCK, 0);

    if (-1 == fd) {
        fprintf(stderr, "Cannot open '%s': %d, %s\n",
                 dev_name, errno, strerror(errno));
        exit(EXIT_FAILURE);
    }
}

static void usage(FILE *fp, int argc, char **argv)
{
    fprintf(fp,
             "Usage: %s [options]\n\n"
             "Version 1.3\n"
             "Options:\n"
             "-d | --device name   Video device name [%s]\n"
             "-h | --help          Print this message\n"
             "-s | --size size     Video size in format WIDTHxHEIGHT\n"
             "-f | --format format 'yuy2' [default] or 'nv12'\n"
             "-r | --rate rate     Setup frame rate [60]\n"
             "-o | --convertHough  convertHough\n"
             "-c | --count count   Number of frames to grab [%i]\n"
             "",
             argv[0], dev_name, frame_count);
}

static const char short_options[] = "d:ho:f:s:c:r:";

static const struct option
long_options[] = {
        { "device", required_argument, nullptr, 'd' },
        { "help",   no_argument,       nullptr, 'h' },
        { "size",   required_argument, nullptr, 's' },
        { "format", required_argument, nullptr, 'f' },
        { "rate",   required_argument, nullptr, 'r' },
        { "count",  required_argument, nullptr, 'c' },
        { 0, 0, 0, 0 }
};

int main(int argc, char **argv)
{
    dev_name = "/dev/video0";

    for (;;) {
        int idx;
        int c;

        c = getopt_long(argc, argv, short_options, long_options, &idx);

        if (-1 == c)
                break;

        switch (c) {
            case 0: /* getopt_long() flag */
                break;

            case 'd':
                dev_name = optarg;
                break;

            case 'h':
                usage(stdout, argc, argv);
                exit(EXIT_SUCCESS);

            case 'o':
                //convertHough();
                break;

            case 'f':
                if (strcmp(optarg, "yuy2") == 0) {
                    req_format = V4L2_PIX_FMT_YUYV;
                } else if (strcmp(optarg, "nv12") == 0) {
                    req_format = V4L2_PIX_FMT_NV12;
                } else {
                    fprintf(stderr, "Unknown format: %s\n", optarg);
                    exit(EXIT_FAILURE);
                }
                break;

            case 's':
            {
                errno = 0;
                char *endptr = nullptr;
                req_width = strtol(optarg, &endptr, 10);
                if (errno)
                    errno_exit(optarg);

                if (*endptr == '\0') {
                    fprintf(stderr, "unknown size: %s\n", optarg);
                    exit(EXIT_FAILURE);
                }

                errno = 0;
                req_height = strtol(endptr+1, nullptr, 10);
                if (errno)
                    errno_exit(optarg);

                break;
            }

            case 'r':
            {
                errno = 0;
                char *endptr = nullptr;
                req_rate_numerator = strtol(optarg, &endptr, 0);
                if (errno)
                    errno_exit(optarg);

                if (*endptr == '\0') {
                    req_rate_denominator = 1;
                } else {
                    errno = 0;
                    req_rate_denominator = strtol(endptr+1, nullptr, 10);
                    if (errno)
                        errno_exit(optarg);
                }

                break;
            }

            case 'c':
                errno = 0;
                frame_count = strtol(optarg, nullptr, 0);
                if (errno)
                    errno_exit(optarg);
                break;

            default:
                usage(stderr, argc, argv);
                exit(EXIT_FAILURE);
        }
    }

    fprintf(stdout,
            "device: %s\n"
            "output: %s\n"
            "size:   %dx%d\n"
            "rate:   %d/%d\n",
            dev_name,
            output_name.c_str(),
            req_width, req_height,
            req_rate_numerator, req_rate_denominator);

    bool invalid = false;
    if (!req_width || !req_height) {
        fprintf(stderr, "size can't be zero\n");
        invalid = true;
    }

    if (!req_rate_denominator || !req_rate_numerator) {
        fprintf(stderr, "rate can't be zero\n");
        invalid = true;
    }

    if (output_name.empty()) {
        fprintf(stderr, "output_name can't be empty\n");
        invalid = true;
    }

    if (invalid)
        exit(EXIT_FAILURE);

    open_device();
    init_device();
    start_capturing();
    mainloop();
    stop_capturing();
    uninit_device();
    close_device();
    fprintf(stderr, "\n");
    return 0;
}
