const environment = import.meta.env.MODE;
export const apiBaseUrl =
  environment === "development"
    ? "http://localhost:8000"
    : // ?"http://18.233.160.251:8001"
      "https://lms-shams-node.onrender.com";

export const ADMIN = "/admin";
export const API_VERSION = "/api/v1";
export const AUTH_URL = "/auth";
export const CATEGORY = "/category";
export const COURSE = "/course";
export const COURSE_CONTENT = "/courseContent";
export const COURSE_QUIZ = "/courseQuiz";
export const COURSE_SECTION = "/coursesection";
export const COURSE_LECTURE = "/courselecture";
export const ROLE = "/role";
export const STAFF = "/staff";
export const PERMISSION = "/permission";
export const STUDENT = "/student";
export const TUTOR = "/tutor";
export const TESTIMONIAL = "/testimonial";
export const FAQS = "/faq";
export const FAQS_CATEGORY = "/faqs/category";
export const BLOGS = "/blog";
export const BLOGS_CATEGORY = "/blogs/category";
export const LANGUAGE = "/language";
export const STAT = "/stat";
export const WEBPAGES = "/webpage";
export const PARTNER = "/partner";
export const ACHIEVEMENT = "/achievement";
export const MEETING = "/meeting";
export const QUESTION = "/question";
export const AUTHPAGE = "/auth-pages";
export const CONTACT = "/contact";
export const SETTING = "/setting";
export const FACILITY = "/facilities";
export const AMENITY = "/amenities";
export const SPACETYPE = "/spacetype";
export const S3 =
  "https://project-images-development.s3.me-central-1.amazonaws.com";
