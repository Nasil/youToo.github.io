```mermaid
---
title: ERD example
---
erDiagram
  Students ||--o{ Student_Subject : "StudentID"
  Students ||--o{ Teachers : "TeacherID"
  Subjects ||--o{ Student_Subject : "SubjectID"
  Subjects ||--o{ Subject_Teacher : "SubjectID"
  Teachers ||--o{ Subject_Teacher : "TeacherID"

  Students {
    int StudentID
    varchar(50) StudentName
    date FeesPaid
    date DateOfBirth
    varchar(100) Address
    pk StudentID
  }

  Subjects {
    int SubjectID
    varchar(50) SubjectName
    varchar(50) CourseName
    pk SubjectID
  }

  Teachers {
    int TeacherID
    varchar(50) TeacherName
    varchar(100) TeacherAddress
    pk TeacherID
  }

  Student_Subject {
    int StudentID
    int SubjectID
    fk StudentID
    fk SubjectID
  }

  Subject_Teacher {
    int SubjectID
    int TeacherID
    fk SubjectID
    fk TeacherID
  }


```
