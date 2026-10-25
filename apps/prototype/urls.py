from django.urls import path
from . import views

app_name = "prototype"

urlpatterns = [
    path("", views.landing, name="landing"),
    path("login/", views.login, name="login"),
    path("forgot-password/", views.forgot_password, name="forgot_password"),
    path("dashboard/", views.dashboard, name="dashboard"),
    path("students/", views.students, name="students"),
    path("attendance/", views.attendance, name="attendance"),
    path("grades/", views.grades, name="grades"),
    path("lesson-plans/", views.lesson_plans, name="lesson_plans"),
    path("requirements/", views.requirements, name="requirements"),
    path("early-warning/", views.early_warning, name="early_warning"),
    path("interventions/", views.interventions, name="interventions"),
    path("reports/", views.reports, name="reports"),
]
