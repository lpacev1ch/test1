from django.db import models

class Project(models.Model):
    CATEGORY_CHOICES = [
        ('testnet', 'Тестнет'),
        ('mainnet', 'Мейннет'),
    ]

    name = models.CharField(max_length=255, verbose_name="Название проекта")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена")
    description = models.TextField(verbose_name="Описание")
    
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='testnet', verbose_name="Категория")

    project_info = models.TextField(verbose_name="Информация о проекте")
    investment_info = models.TextField(verbose_name="Информация об инвестициях")
    potential_info = models.TextField(verbose_name="Информация о потенциале")

    accounts_order_name = models.CharField(max_length=255, blank=True, null=True)
    accounts_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    points_order_name = models.CharField(max_length=255, blank=True, null=True)
    points_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    # Поля для активностей (1 обязательная, остальные необязательные)
    activity1_name = models.CharField(max_length=255, verbose_name="Название Активности 1")
    activity1_task = models.TextField(verbose_name="Описание Активности 1")
    activity1_price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена Активности 1")

    # Поля для остальных активностей (2-10)
    for i in range(2, 11):
        locals()[f'activity{i}_name'] = models.CharField(max_length=255, blank=True, null=True, verbose_name=f"Название Активности {i}")
        locals()[f'activity{i}_task'] = models.TextField(blank=True, null=True, verbose_name=f"Описание Активности {i}")
        locals()[f'activity{i}_price'] = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, verbose_name=f"Цена Активности {i}")
