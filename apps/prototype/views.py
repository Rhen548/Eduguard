"""Read-only UI prototype views. No accounts, database tables, or SMS APIs are used."""
from datetime import date

from django.shortcuts import render

from .sample_data import (
    ATTENDANCE,
    GRADEBOOK,
    INTERVENTIONS,
    LESSON_PLANS,
    REQUIREMENTS,
    STUDENTS,
    WARNINGS,
)

ROLE_INFO = {
    "admin": {"name": "Administrator", "label": "Demo Administrator", "initials": "AD"},
    "teacher": {"name": "Teacher", "label": "Demo Teacher", "initials": "TC"},
    "guidance": {"name": "Guidance Staff", "label": "Demo Guidance Officer", "initials": "GS"},
}


def _page(request, template, active, title, subtitle, **extra):
    role = request.GET.get("role", "admin").lower()
    if role not in ROLE_INFO:
        role = "admin"
    ctx = {
        "role": role,
        "role_info": ROLE_INFO[role],
        "active": active,
        "page_title": title,
        "page_subtitle": subtitle,
        "today": date(2026, 10, 13),  # Fixed date for reproducible demonstration screenshots.
        "demo": True,
        **extra,
    }
    return render(request, f"prototype/{template}.html", ctx)


# ==========================================
# EDUGUARD PUBLIC LANDING PAGE
# ==========================================

def landing(request):
    return render(request, "prototype/landing.html")


def login(request):
    return render(request, "prototype/login.html", {"roles": ROLE_INFO})


# ==========================================
# FORGOT PASSWORD — INTERACTIVE DEMO
# ==========================================

def forgot_password(request):
    return render(
        request,
        "prototype/forgot_password.html"
    )



# Presentation-only figures based on the fictional sample_data.py records.
# These are not school statistics or authenticated per-user assignments.
DASHBOARD_CONFIG = {
    "admin": {
        "title": "Overview Dashboard",
        "subtitle": "A school-wide preview of academic and attendance operations.",
        "metrics": [
            {"label": "Active Students", "value": "1,248", "detail": "Illustrative school-wide total", "icon": "i-users", "color": "color-indigo"},
            {"label": "Attendance Rate", "value": "94.6%", "detail": "Illustrative school-wide rate", "icon": "i-scan", "color": "color-teal"},
            {"label": "Academic Average", "value": "85.3", "detail": "Illustrative school-wide average", "icon": "i-book", "color": "color-purple"},
            {"label": "Students at Risk", "value": "28", "detail": "Illustrative school-wide count", "icon": "i-alert", "color": "color-amber"},
        ],
    },
    "teacher": {
        "title": "Teacher Dashboard",
        "subtitle": "A classroom-focused preview of learning activities and student progress.",
        "metrics": [
            {"label": "Sample Student Profiles", "value": str(len(STUDENTS)), "detail": "Example records, not assigned students", "icon": "i-users", "color": "color-indigo"},
            {"label": "Learning Requirements", "value": str(len(REQUIREMENTS)), "detail": "Sample activities being tracked", "icon": "i-file", "color": "color-teal"},
            {"label": "Missing Lesson Plans", "value": str(sum(p["status"] == "Missing" for p in LESSON_PLANS)), "detail": "Across example plan records", "icon": "i-clipboard", "color": "color-purple"},
            {"label": "Students to Review", "value": str(len(WARNINGS)), "detail": "Based on fictional warning examples", "icon": "i-alert", "color": "color-amber"},
        ],
    },
    "guidance": {
        "title": "Guidance Dashboard",
        "subtitle": "Focus on student concerns, interventions, and follow-up activity.",
        "metrics": [
            {"label": "Students Flagged", "value": str(len(WARNINGS)), "detail": "Fictional early-warning list", "icon": "i-users", "color": "color-indigo"},
            {"label": "High-Risk Cases", "value": str(sum(w["risk"] == "High" for w in WARNINGS)), "detail": "For human review only", "icon": "i-alert", "color": "color-amber"},
            {"label": "Pending Follow-ups", "value": str(sum(c["status"] == "To Do" for c in INTERVENTIONS)), "detail": "Example intervention records", "icon": "i-clock", "color": "color-purple"},
            {"label": "Resolved Cases", "value": str(sum(c["status"] == "Resolved" for c in INTERVENTIONS)), "detail": "Example intervention records", "icon": "i-check", "color": "color-teal"},
        ],
    },
}


def dashboard(request):
    role = request.GET.get("role", "admin").lower()
    if role not in ROLE_INFO:
        role = "admin"
    screen = DASHBOARD_CONFIG[role]
    return _page(
        request, "dashboard", "dashboard", screen["title"], screen["subtitle"],
        dashboard_metrics=screen["metrics"],
        alerts=WARNINGS[:4], students=STUDENTS[:5],
        present_count=9, late_count=2, absent_count=3,
    )


def students(request):
    return _page(request, "students", "students", "Student Directory", "Browse student records, profiles, and academic standing.", students=STUDENTS)


def attendance(request):
    return _page(request, "attendance", "attendance", "QR Attendance", "Track student time-in, time-out, and attendance summaries.", records=ATTENDANCE)


def grades(request):
    return _page(request, "grades", "grades", "Grade Management", "View class performance and gradebook summaries.", grades=GRADEBOOK)


def lesson_plans(request):
    return _page(request, "lesson_plans", "lesson_plans", "Lesson Plan Monitoring", "Review teacher submissions and identify missing lesson plans.", plans=LESSON_PLANS)


def requirements(request):
    return _page(request, "requirements", "requirements", "Learning Requirements", "Track class activities, assignments, and submission progress.", requirements=REQUIREMENTS)


def early_warning(request):
    return _page(request, "early_warning", "early_warning", "Early Warning Insights", "Identify concerns and review transparent sample indicators.", warnings=WARNINGS)


def interventions(request):
    return _page(request, "interventions", "interventions", "Intervention Management", "Manage follow-ups and support actions for students.", interventions=INTERVENTIONS)


def reports(request):
    return _page(request, "reports", "reports", "Reports & Analytics", "Explore report previews and export sample data.")
