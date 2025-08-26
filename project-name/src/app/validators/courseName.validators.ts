// import { FormControl, ValidationErrors } from "@angular/forms";

// const COURSES = [
//   'Arabic - اللغة العربية',
//   'English - اللغة الإنجليزية',
//   'Mathematics - الرياضيات',
//   'Science - العلوم',
//   'Social Studies - الدراسات الاجتماعية',
//   'Religious Education - التربية الدينية',
//   'Computer Science - الحاسب الآلي',
//   'French - اللغة الفرنسية',
//   'German - اللغة الألمانية',
//   'Physics - الفيزياء',
//   'Chemistry - الكيمياء',
//   'Biology - الأحياء',
//   'Geology - الجيولوجيا',
//   'History - التاريخ',
//   'Geography - الجغرافيا',
//   'Philosophy - الفلسفة',
//   'Psychology - علم النفس',
//   'National Education - التربية الوطنية',
//   'Physical Education - التربية الرياضية',
//   'Art Education - التربية الفنية',
//   'Economics - الاقتصاد',
//   'Statistics - الإحصاء',
//   'Sociology - علم الاجتماع',
//   'Logic - المنطق',
//   'Environmental Science - علوم البيئة'
// ];


// export function courseValidator(control: FormControl):null|ValidationErrors{
//     if(!control.value) return null;
//     return COURSES.includes(control.value.toLowerCase()) ? null : {invalidCourse:true}
// }