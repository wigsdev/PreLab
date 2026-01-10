from django.contrib import admin
from .models import University, Course, Topic, Question, Option

@admin.register(University)
class UniversityAdmin(admin.ModelAdmin):
    list_display = ('acronym', 'items')
    search_fields = ('items', 'acronym')

class TopicInline(admin.TabularInline):
    model = Topic
    extra = 1

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('name', 'code')
    search_fields = ('name', 'code')
    inlines = [TopicInline]

@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = ('name', 'course')
    list_filter = ('course',)
    search_fields = ('name',)

class OptionInline(admin.TabularInline):
    model = Option
    extra = 4  # Por defecto mostramos 4 opciones vacías para llenar rápido
    min_num = 2  # Al menos 2 opciones
    validate_min = True

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('short_statement', 'topic_name', 'course_name', 'difficulty')
    list_filter = ('topic__course', 'topic', 'difficulty')
    search_fields = ('statement', 'explanation')
    inlines = [OptionInline]
    
    # Optimizaciones para cargar datos (N+1 problem)
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('topic', 'topic__course')

    def topic_name(self, obj):
        return obj.topic.name
    topic_name.admin_order_field = 'topic'
    topic_name.short_description = 'Tema'

    def course_name(self, obj):
        return obj.topic.course.name
    course_name.admin_order_field = 'topic__course'
    course_name.short_description = 'Curso'

    def short_statement(self, obj):
        return obj.statement[:50] + "..." if len(obj.statement) > 50 else obj.statement
    short_statement.short_description = 'Enunciado'
