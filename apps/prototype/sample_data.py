"""All records below are FICTIONAL examples for visual prototyping only.

Replace this module with database-driven selectors/services during the actual build.
"""

STUDENTS = [
    {"id": "EDG-1001", "name": "Alyssa Reyes", "initials": "AR", "grade": "7", "section": "Sampaguita", "average": 92, "attendance": 98, "risk": "Low", "email": "alyssa.reyes@example.test"},
    {"id": "EDG-1002", "name": "Miguel Santos", "initials": "MS", "grade": "7", "section": "Sampaguita", "average": 78, "attendance": 86, "risk": "Moderate", "email": "miguel.santos@example.test"},
    {"id": "EDG-1003", "name": "Sofia Mendoza", "initials": "SM", "grade": "8", "section": "Molave", "average": 95, "attendance": 100, "risk": "Low", "email": "sofia.mendoza@example.test"},
    {"id": "EDG-1004", "name": "Liam Cruz", "initials": "LC", "grade": "8", "section": "Molave", "average": 71, "attendance": 74, "risk": "High", "email": "liam.cruz@example.test"},
    {"id": "EDG-1005", "name": "Isabella Garcia", "initials": "IG", "grade": "9", "section": "Narra", "average": 89, "attendance": 96, "risk": "Low", "email": "isabella.garcia@example.test"},
    {"id": "EDG-1006", "name": "Noah Dela Cruz", "initials": "ND", "grade": "9", "section": "Narra", "average": 73, "attendance": 81, "risk": "High", "email": "noah.delacruz@example.test"},
    {"id": "EDG-1007", "name": "Chloe Ramos", "initials": "CR", "grade": "10", "section": "Mabini", "average": 87, "attendance": 91, "risk": "Low", "email": "chloe.ramos@example.test"},
    {"id": "EDG-1008", "name": "Ethan Navarro", "initials": "EN", "grade": "10", "section": "Mabini", "average": 79, "attendance": 79, "risk": "Moderate", "email": "ethan.navarro@example.test"},
    {"id": "EDG-1009", "name": "Zoe Villanueva", "initials": "ZV", "grade": "7", "section": "Sampaguita", "average": 94, "attendance": 97, "risk": "Low", "email": "zoe.villanueva@example.test"},
    {"id": "EDG-1010", "name": "Gabriel Flores", "initials": "GF", "grade": "8", "section": "Molave", "average": 82, "attendance": 89, "risk": "Moderate", "email": "gabriel.flores@example.test"},
    {"id": "EDG-1011", "name": "Nina Aquino", "initials": "NA", "grade": "9", "section": "Narra", "average": 90, "attendance": 95, "risk": "Low", "email": "nina.aquino@example.test"},
    {"id": "EDG-1012", "name": "Jacob Bautista", "initials": "JB", "grade": "10", "section": "Mabini", "average": 69, "attendance": 70, "risk": "High", "email": "jacob.bautista@example.test"},
]

ATTENDANCE = [
    {"id": "EDG-1001", "name": "Alyssa Reyes", "initials": "AR", "grade": "7", "section": "Sampaguita", "time_in": "7:12 AM", "time_out": "4:02 PM", "status": "Present"},
    {"id": "EDG-1002", "name": "Miguel Santos", "initials": "MS", "grade": "7", "section": "Sampaguita", "time_in": "7:39 AM", "time_out": "—", "status": "Late"},
    {"id": "EDG-1003", "name": "Sofia Mendoza", "initials": "SM", "grade": "8", "section": "Molave", "time_in": "7:09 AM", "time_out": "4:05 PM", "status": "Present"},
    {"id": "EDG-1004", "name": "Liam Cruz", "initials": "LC", "grade": "8", "section": "Molave", "time_in": "—", "time_out": "—", "status": "Absent"},
    {"id": "EDG-1005", "name": "Isabella Garcia", "initials": "IG", "grade": "9", "section": "Narra", "time_in": "7:18 AM", "time_out": "—", "status": "Present"},
    {"id": "EDG-1006", "name": "Noah Dela Cruz", "initials": "ND", "grade": "9", "section": "Narra", "time_in": "7:33 AM", "time_out": "—", "status": "Late"},
    {"id": "EDG-1007", "name": "Chloe Ramos", "initials": "CR", "grade": "10", "section": "Mabini", "time_in": "7:14 AM", "time_out": "—", "status": "Present"},
    {"id": "EDG-1012", "name": "Jacob Bautista", "initials": "JB", "grade": "10", "section": "Mabini", "time_in": "—", "time_out": "—", "status": "Absent"},
]

GRADEBOOK = [
    {"name": "Alyssa Reyes", "initials": "AR", "id": "EDG-1001", "ww": 93, "pt": 91, "qa": 92, "final": 92, "remarks": "Passed"},
    {"name": "Miguel Santos", "initials": "MS", "id": "EDG-1002", "ww": 79, "pt": 76, "qa": 81, "final": 78, "remarks": "Passed"},
    {"name": "Sofia Mendoza", "initials": "SM", "id": "EDG-1003", "ww": 96, "pt": 94, "qa": 95, "final": 95, "remarks": "Passed"},
    {"name": "Liam Cruz", "initials": "LC", "id": "EDG-1004", "ww": 73, "pt": 69, "qa": 71, "final": 71, "remarks": "Needs attention"},
    {"name": "Isabella Garcia", "initials": "IG", "id": "EDG-1005", "ww": 88, "pt": 91, "qa": 86, "final": 89, "remarks": "Passed"},
    {"name": "Noah Dela Cruz", "initials": "ND", "id": "EDG-1006", "ww": 75, "pt": 72, "qa": 71, "final": 73, "remarks": "Needs attention"},
    {"name": "Chloe Ramos", "initials": "CR", "id": "EDG-1007", "ww": 89, "pt": 86, "qa": 86, "final": 87, "remarks": "Passed"},
    {"name": "Jacob Bautista", "initials": "JB", "id": "EDG-1012", "ww": 71, "pt": 68, "qa": 66, "final": 69, "remarks": "Needs attention"},
]

LESSON_PLANS = [
    {"title": "Introduction to Linear Equations", "subject": "Mathematics 8", "teacher": "Maria Villanueva", "week": "Week 7", "submitted": "Oct 12, 2026", "status": "Approved"},
    {"title": "Chemical Reactions", "subject": "Science 9", "teacher": "Daniel Torres", "week": "Week 7", "submitted": "Oct 11, 2026", "status": "For Review"},
    {"title": "Florante at Laura", "subject": "Filipino 8", "teacher": "Rachel Dizon", "week": "Week 7", "submitted": "Oct 10, 2026", "status": "Approved"},
    {"title": "Philippine Geography", "subject": "Araling Panlipunan 7", "teacher": "Maria Villanueva", "week": "Week 7", "submitted": "—", "status": "Missing"},
    {"title": "Web Development Basics", "subject": "TLE 10", "teacher": "Erwin Lopez", "week": "Week 7", "submitted": "Oct 12, 2026", "status": "For Review"},
    {"title": "Subject-Verb Agreement", "subject": "English 7", "teacher": "Rachel Dizon", "week": "Week 7", "submitted": "Oct 09, 2026", "status": "Approved"},
]

REQUIREMENTS = [
    {"title": "Linear Equations Activity", "subject": "Mathematics 8", "type": "Assignment", "due": "Oct 16, 2026", "submitted": 31, "total": 35, "progress": 89, "status": "Open"},
    {"title": "Science Lab Report", "subject": "Science 9", "type": "Project", "due": "Oct 15, 2026", "submitted": 26, "total": 34, "progress": 76, "status": "Due soon"},
    {"title": "Reading Reflection", "subject": "English 7", "type": "Assignment", "due": "Oct 09, 2026", "submitted": 28, "total": 36, "progress": 78, "status": "Closed"},
    {"title": "Mapping the Philippines", "subject": "Araling Panlipunan 7", "type": "Activity", "due": "Oct 18, 2026", "submitted": 19, "total": 35, "progress": 54, "status": "Open"},
]

WARNINGS = [
    {"id": "EDG-1012", "name": "Jacob Bautista", "initials": "JB", "grade": "10 - Mabini", "risk": "High", "average": 69, "attendance": 70, "reason": "Low grade average and frequent absences", "action": "Refer for guidance review"},
    {"id": "EDG-1004", "name": "Liam Cruz", "initials": "LC", "grade": "8 - Molave", "risk": "High", "average": 71, "attendance": 74, "reason": "Low grade average and attendance decline", "action": "Schedule parent conference"},
    {"id": "EDG-1006", "name": "Noah Dela Cruz", "initials": "ND", "grade": "9 - Narra", "risk": "High", "average": 73, "attendance": 81, "reason": "Below passing grade threshold", "action": "Begin academic monitoring"},
    {"id": "EDG-1002", "name": "Miguel Santos", "initials": "MS", "grade": "7 - Sampaguita", "risk": "Moderate", "average": 78, "attendance": 86, "reason": "Attendance trend needs monitoring", "action": "Follow up with adviser"},
    {"id": "EDG-1008", "name": "Ethan Navarro", "initials": "EN", "grade": "10 - Mabini", "risk": "Moderate", "average": 79, "attendance": 79, "reason": "Attendance below sample threshold", "action": "Review attendance pattern"},
]

INTERVENTIONS = [
    {"case": "INT-025", "name": "Jacob Bautista", "initials": "JB", "grade": "Grade 10", "type": "Guidance counseling", "owner": "Guidance Office", "date": "Oct 14, 2026", "status": "To Do", "notes": "Initial assessment requested"},
    {"case": "INT-026", "name": "Liam Cruz", "initials": "LC", "grade": "Grade 8", "type": "Parent conference", "owner": "Class Adviser", "date": "Oct 15, 2026", "status": "To Do", "notes": "Coordinate conference schedule"},
    {"case": "INT-023", "name": "Noah Dela Cruz", "initials": "ND", "grade": "Grade 9", "type": "Academic support", "owner": "Subject Teacher", "date": "Oct 16, 2026", "status": "In Progress", "notes": "Weekly performance monitoring"},
    {"case": "INT-020", "name": "Miguel Santos", "initials": "MS", "grade": "Grade 7", "type": "Attendance follow-up", "owner": "Class Adviser", "date": "Oct 12, 2026", "status": "In Progress", "notes": "Review attendance next week"},
    {"case": "INT-018", "name": "Isabella Garcia", "initials": "IG", "grade": "Grade 9", "type": "Academic check-in", "owner": "Subject Teacher", "date": "Oct 08, 2026", "status": "Resolved", "notes": "Improvement verified by teacher"},
]
