
#include <stdio.h> 
#include <QApplication>
#include <QLabel>
#include <QImage>
#include <QPixmap>
 
int main(int argc, char **argv)
{
    QApplication app(argc, argv);
    QLabel *label = new QLabel("test");
    QLabel *label2 = new QLabel("test_out");

    QImage image;
    QPixmap buffer;
    
    image.load("/home/apps/AGV/src/camera/aruco/image/imgBinary2.pgm");
    buffer = QPixmap::fromImage(image);
    label->setPixmap(buffer);                                                                        
    label->show();
   

    image.load("/home/apps/AGV/src/camera/aruco/image/imgBinary9.pgm");
    buffer = QPixmap::fromImage(image);
    label2->setPixmap(buffer);
    label2->show();
    label2->move(100, 50);

    return app.exec();
} 
