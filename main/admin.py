from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'category']  # Категория видна в общем списке
    fields = [
        'name', 'price', 'description', 'category',  # Поле категории для выбора в админке
        'project_info', 'investment_info', 'potential_info',
        'accounts_order_name', 'accounts_price',
        'points_order_name', 'points_price',
        'activity1_name', 'activity1_task', 'activity1_price'
    ] + [f'activity{i}_name' for i in range(2, 11)] \
      + [f'activity{i}_task' for i in range(2, 11)] \
      + [f'activity{i}_price' for i in range(2, 11)]
