# from django.shortcuts import render

# # Create your views here.

# def index(request):
#     return render(request, 'index.html')

# def project(request):
#     return render(request, 'project.html')

# # from django.shortcuts import render, get_object_or_404
# # from .models import Project

# # def project_detail(request, project_id):
# #     project = get_object_or_404(Project, id=project_id)
# #     return render(request, 'project.html', {'project': project})

# from django.shortcuts import render, get_object_or_404
# from .models import Project

# def index(request):
#     return render(request, 'index.html')

# def project(request, project_id):
#     # Получаем объект проекта по его ID
#     project = get_object_or_404(Project, id=project_id)
    
#     # Передаем данные проекта в шаблон project.html
#     return render(request, 'project.html', {'project': project})

# from django.shortcuts import render, get_object_or_404
# from .models import Project

# def index(request):
#     return render(request, 'index.html')

# def project(request, project_id):
#     # Получаем объект проекта по его ID
#     project = get_object_or_404(Project, id=project_id)
    
#     # Передаем данные проекта в шаблон project.html
#     return render(request, 'project.html', {'project': project})

from django.shortcuts import render, get_object_or_404
from .models import Project

def index(request):
    # Фильтруем проекты по категориям
    testnet_projects = Project.objects.filter(category='testnet')  # Проекты категории "Тестнет"
    mainnet_projects = Project.objects.filter(category='mainnet')  # Проекты категории "Мейннет"

    # Передаем отфильтрованные проекты в шаблон index.html
    return render(request, 'index.html', {
        'testnet_projects': testnet_projects,
        'mainnet_projects': mainnet_projects
    })

def project(request, project_id):
    # Получаем объект проекта по его ID
    project = get_object_or_404(Project, id=project_id)
    
    # Передаем данные проекта в шаблон project.html
    return render(request, 'project.html', {'project': project})
