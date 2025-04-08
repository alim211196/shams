import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import AdminLayout from "../layouts/AdminLayout";
import NotFound from "../pages/NotFound";
import Unauthorized from "../pages/Unauthorized";
import SuspenseLoader from "../features/SuspenseLoader";
import AuthorizedRoute from "./AuthorizedRoute";

const Login = lazy(() => import("../pages/Login"));
const RolePage = lazy(() => import("../pages/RoleListing"));
const AddUpdateRole = lazy(() => import("../pages/AddUpdateRole"));
const StaffPage = lazy(() => import("../pages/StaffListing"));
const AddUpdateStaff = lazy(() => import("../pages/AddUpdateStaff"));
const PermissionPage = lazy(() => import("../pages/PermissionListing"));

const AdminListing = lazy(() => import("../pages/AdminListing"));
const AddUpdateAdmin = lazy(() => import("../pages/AddUpdateAdmin"));

const CourseListing = lazy(() => import("../pages/CourseListing"));
const AddUpdateCourse = lazy(() => import("../pages/AddUpdateCourse"));

const InstructorListing = lazy(() => import("../pages/InstructorListing"));
const AddUpdateInstructor = lazy(() => import("../pages/AddUpdateInstructor"));

const CategoryListing = lazy(() => import("../pages/CategoryListing"));
const AddUpdateCategory = lazy(() => import("../pages/AddUpdateCategory"));

const StudentListing = lazy(() => import("../pages/StudentListing"));
const StudentViewDetails = lazy(() => import("../pages/StudentViewDetails"));
const AddUpdateStudent = lazy(() => import("../pages/AddUpdateStudent"));

const TestimonialListing = lazy(() => import("../pages/TestimonialListing"));
const AddUpdateTestimonial = lazy(() =>
  import("../pages/AddUpdateTestimonial")
);
const FaqsListing = lazy(() => import("../pages/FaqsListing"));
const AddUpdateFaq = lazy(() => import("../pages/AddUpdateFaq"));
const FaqsCategories = lazy(() => import("../pages/FaqsCategories"));
const AddUpdateFaqCategories = lazy(() =>
  import("../pages/AddUpdateFaqCategories")
);

const BlogsListing = lazy(() => import("../pages/BlogsListing"));
const AddUpdateBlog = lazy(() => import("../pages/AddUpdateBlog"));
const BlogsCategories = lazy(() => import("../pages/BlogsCategories"));
const AddUpdateBlogCategories = lazy(() =>
  import("../pages/AddUpdateBlogCategories")
);

const LanguageListing = lazy(() => import("../pages/LanguageListing"));
const AddUpdateLanguage = lazy(() => import("../pages/AddUpdateLanguage"));
const PagesListing = lazy(() => import("../pages/PagesListing"));
const AddUpdatePage = lazy(() => import("../pages/AddUpdatePage"));

const SectionPage = lazy(() => import("../pages/SectionPage"));

const StatsListing = lazy(() => import("../pages/StatsListing"));
const AddUpdateStat = lazy(() => import("../pages/AddUpdateStat"));

const PartnersListing = lazy(() => import("../pages/PartnersListing"));
const AddUpdatePartner = lazy(() => import("../pages/AddUpdatePartner"));

const AchievementsListing = lazy(() => import("../pages/AchievementsListing"));
const AddUpdateAchievement = lazy(() =>
  import("../pages/AddUpdateAchievement")
);
const MeetingListing = lazy(() => import("../pages/MeetingListing"));
const AddUpdateMeeting = lazy(() => import("../pages/AddUpdateMeeting"));

const StudentQuestionsListing = lazy(() =>
  import("../pages/StudentQuestionsListing")
);
const AddUpdateStudentQuestions = lazy(() =>
  import("../pages/AddUpdateStudentQuestions")
);

const AdminAuth = lazy(() => import("../pages/AdminAuth"));
const StudentAuth = lazy(() => import("../pages/StudentAuth"));
const TrainerAuth = lazy(() => import("../pages/TrainerAuth"));

const ContactInquiries = lazy(() => import("../pages/ContactInquiries"));

const Footer = lazy(() => import("../pages/Footer"));
const Header = lazy(() => import("../pages/Header"));

const Appearance = lazy(() => import("../pages/Appearance"));

const FacilitiesListing = lazy(() => import("../pages/FacilitiesListing"));
const AddUpdateFacility = lazy(() => import("../pages/AddUpdateFacilities"));

const AmenitiesListing = lazy(() => import("../pages/AmenitiesListing"));
const SpaceTypesListing = lazy(() => import("../pages/SpaceTypesListing"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Suspense fallback={<SuspenseLoader />}>
          <Login />
        </Suspense>
      </PublicRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        {/* Wrap the entire AdminLayout in Suspense */}
        <Suspense fallback={<SuspenseLoader />}>
          <AdminLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "staff-management/role",
        element: (
          <AuthorizedRoute requiredPermission="view_staff_roles">
            <RolePage />
          </AuthorizedRoute>
        ),
      },
      {
        path: "staff-management/role/create",
        element: (
          <AuthorizedRoute requiredPermission="add_staff_role">
            <AddUpdateRole />
          </AuthorizedRoute>
        ),
      },
      {
        path: "staff-management/role/edit/:id",
        element: (
          <AuthorizedRoute requiredPermission="edit_staff_role">
            <AddUpdateRole />
          </AuthorizedRoute>
        ),
      },
      {
        path: "staff-management/staff",
        element: (
          <AuthorizedRoute requiredPermission="view_all_staffs">
            <StaffPage />
          </AuthorizedRoute>
        ),
      },
      {
        path: "staff-management/staff/create",
        element: (
          <AuthorizedRoute requiredPermission="add_staff">
            <AddUpdateStaff />
          </AuthorizedRoute>
        ),
      },
      {
        path: "staff-management/staff/edit/:id",
        element: (
          <AuthorizedRoute requiredPermission="edit_staff">
            <AddUpdateStaff />
          </AuthorizedRoute>
        ),
      },
      {
        path: "staff-management/permission",
        element: (
          <AuthorizedRoute requiredPermission="view_all_permissions">
            <PermissionPage />
          </AuthorizedRoute>
        ),
      },
      { path: "admin-listing", element: <AdminListing /> },
      { path: "settings/admin", element: <AddUpdateAdmin /> },
      { path: "settings/admin/:id", element: <AddUpdateAdmin /> },

      {
        path: "course-listing",
        element: (
          <AuthorizedRoute requiredPermission="view_all_courses">
            <CourseListing />
          </AuthorizedRoute>
        ),
      },
      {
        path: "course",
        element: (
          <AuthorizedRoute requiredPermission="add_course">
            <AddUpdateCourse />
          </AuthorizedRoute>
        ),
      },
      {
        path: "course/:id",
        element: (
          <AuthorizedRoute requiredPermission="edit_course">
            <AddUpdateCourse />
          </AuthorizedRoute>
        ),
      },

      {
        path: "instructor-listing",
        element: (
          <AuthorizedRoute requiredPermission="view_all_instructors">
            <InstructorListing />
          </AuthorizedRoute>
        ),
      },
      {
        path: "instructor",
        element: (
          <AuthorizedRoute requiredPermission="add_instructor">
            <AddUpdateInstructor />
          </AuthorizedRoute>
        ),
      },
      {
        path: "instructor/:id",
        element: (
          <AuthorizedRoute requiredPermission="edit_instructor">
            <AddUpdateInstructor />
          </AuthorizedRoute>
        ),
      },
      {
        path: "student-listing",
        element: (
          <AuthorizedRoute requiredPermission="view_all_students">
            <StudentListing />
          </AuthorizedRoute>
        ),
      },
      {
        path: "student",
        element: (
          <AuthorizedRoute requiredPermission="add_student">
            <AddUpdateStudent />
          </AuthorizedRoute>
        ),
      },
      {
        path: "student/:id",
        element: (
          <AuthorizedRoute requiredPermission="edit_student">
            <AddUpdateStudent />
          </AuthorizedRoute>
        ),
      },

      {
        path: "student/view/:id",
        element: (
          <AuthorizedRoute requiredPermission="view_student">
            <StudentViewDetails />
          </AuthorizedRoute>
        ),
      },

      {
        path: "category-listing",
        element: (
          <AuthorizedRoute requiredPermission="view_all_categories">
            <CategoryListing />
          </AuthorizedRoute>
        ),
      },
      {
        path: "category",
        element: (
          <AuthorizedRoute requiredPermission="add_category">
            <AddUpdateCategory />
          </AuthorizedRoute>
        ),
      },
      {
        path: "category/:id",
        element: (
          <AuthorizedRoute requiredPermission="edit_category">
            <AddUpdateCategory />
          </AuthorizedRoute>
        ),
      },

      {
        path: "languages-listing",
        element: (
          <AuthorizedRoute requiredPermission="view_all_languages">
            <LanguageListing />
          </AuthorizedRoute>
        ),
      },
      {
        path: "language",
        element: (
          <AuthorizedRoute requiredPermission="add_language">
            <AddUpdateLanguage />
          </AuthorizedRoute>
        ),
      },
      {
        path: "language/:id",
        element: (
          <AuthorizedRoute requiredPermission="edit_language">
            <AddUpdateLanguage />
          </AuthorizedRoute>
        ),
      },

      {
        path: "settings/testimonials-listing",
        element: (
          <AuthorizedRoute requiredPermission="view_all_testimonials">
            <TestimonialListing />
          </AuthorizedRoute>
        ),
      },
      {
        path: "settings/testimonial",
        element: (
          <AuthorizedRoute requiredPermission="add_testimonial">
            <AddUpdateTestimonial />
          </AuthorizedRoute>
        ),
      },
      {
        path: "settings/testimonial/:id",
        element: (
          <AuthorizedRoute requiredPermission="edit_testimonial">
            <AddUpdateTestimonial />
          </AuthorizedRoute>
        ),
      },

      {
        path: "faqs/faqs-listing",
        element: (
          <AuthorizedRoute requiredPermission="view_all_faqs">
            <FaqsListing />
          </AuthorizedRoute>
        ),
      },
      {
        path: "faqs/faq",
        element: (
          <AuthorizedRoute requiredPermission="add_faq">
            <AddUpdateFaq />
          </AuthorizedRoute>
        ),
      },
      {
        path: "faqs/faq/:id",
        element: (
          <AuthorizedRoute requiredPermission="edit_faq">
            <AddUpdateFaq />
          </AuthorizedRoute>
        ),
      },

      {
        path: "faqs/faqs-categories",
        element: (
          <AuthorizedRoute requiredPermission="view_all_faqs_categories">
            <FaqsCategories />
          </AuthorizedRoute>
        ),
      },
      {
        path: "faqs/category",
        element: (
          <AuthorizedRoute requiredPermission="add_faq_category">
            <AddUpdateFaqCategories />
          </AuthorizedRoute>
        ),
      },
      {
        path: "faqs/category/:id",
        element: (
          <AuthorizedRoute requiredPermission="edit_faq_category">
            <AddUpdateFaqCategories />
          </AuthorizedRoute>
        ),
      },

      {
        path: "blogs/blogs-listing",
        element: (
          <AuthorizedRoute requiredPermission="view_all_posts">
            <BlogsListing />
          </AuthorizedRoute>
        ),
      },
      {
        path: "blogs/blog",
        element: (
          <AuthorizedRoute requiredPermission="add_post">
            <AddUpdateBlog />
          </AuthorizedRoute>
        ),
      },
      {
        path: "blogs/blog/:id",
        element: (
          <AuthorizedRoute requiredPermission="edit_post">
            <AddUpdateBlog />
          </AuthorizedRoute>
        ),
      },

      {
        path: "blogs/blogs-categories",
        element: (
          <AuthorizedRoute requiredPermission="view_all_posts_categories">
            <BlogsCategories />
          </AuthorizedRoute>
        ),
      },
      {
        path: "blogs/category",
        element: (
          <AuthorizedRoute requiredPermission="add_post_category">
            <AddUpdateBlogCategories />
          </AuthorizedRoute>
        ),
      },
      {
        path: "blogs/category/:id",
        element: (
          <AuthorizedRoute requiredPermission="edit_post_category">
            <AddUpdateBlogCategories />
          </AuthorizedRoute>
        ),
      },

      {
        path: "settings/stats-listing",
        element: (
          <AuthorizedRoute requiredPermission="view_all_stats">
            <StatsListing />
          </AuthorizedRoute>
        ),
      },
      {
        path: "settings/stat",
        element: (
          <AuthorizedRoute requiredPermission="add_stat">
            <AddUpdateStat />
          </AuthorizedRoute>
        ),
      },
      {
        path: "settings/stat/:id",
        element: (
          <AuthorizedRoute requiredPermission="edit_stat">
            <AddUpdateStat />
          </AuthorizedRoute>
        ),
      },

      {
        path: "website/pages",
        element: (
          <AuthorizedRoute requiredPermission="view_all_pages">
            <PagesListing />
          </AuthorizedRoute>
        ),
      },
      {
        path: "website/custom-pages/create",
        element: (
          <AuthorizedRoute requiredPermission="add_page">
            <AddUpdatePage />
          </AuthorizedRoute>
        ),
      },
      {
        path: "website/custom-pages/edit/:id",
        element: (
          <AuthorizedRoute requiredPermission="edit_page">
            <AddUpdatePage />
          </AuthorizedRoute>
        ),
      },
      {
        path: "website/custom-pages/sections/:id",
        element: (
          <AuthorizedRoute requiredPermission="edit_section">
            <SectionPage />
          </AuthorizedRoute>
        ),
      },
      {
        path: "website/footer",
        element: (
          <AuthorizedRoute requiredPermission="view_all_pages">
            <Footer />
          </AuthorizedRoute>
        ),
      },
      {
        path: "website/header",
        element: (
          <AuthorizedRoute requiredPermission="view_all_pages">
            <Header />
          </AuthorizedRoute>
        ),
      },
      {
        path: "website/appearance",
        element: (
          <AuthorizedRoute requiredPermission="view_all_pages">
            <Appearance />
          </AuthorizedRoute>
        ),
      },

      {
        path: "settings/partners-listing",
        element: (
          <AuthorizedRoute requiredPermission="view_all_partners">
            <PartnersListing />
          </AuthorizedRoute>
        ),
      },
      {
        path: "settings/partner",
        element: (
          <AuthorizedRoute requiredPermission="add_partner">
            <AddUpdatePartner />
          </AuthorizedRoute>
        ),
      },
      {
        path: "settings/partner/:id",
        element: (
          <AuthorizedRoute requiredPermission="edit_partner">
            <AddUpdatePartner />
          </AuthorizedRoute>
        ),
      },

      {
        path: "settings/achievements-listing",
        element: (
          <AuthorizedRoute requiredPermission="view_all_achievements">
            <AchievementsListing />
          </AuthorizedRoute>
        ),
      },
      {
        path: "settings/achievement",
        element: (
          <AuthorizedRoute requiredPermission="add_achievement">
            <AddUpdateAchievement />
          </AuthorizedRoute>
        ),
      },
      {
        path: "settings/achievement/:id",
        element: (
          <AuthorizedRoute requiredPermission="edit_achievement">
            <AddUpdateAchievement />
          </AuthorizedRoute>
        ),
      },

      {
        path: "meetings-listing",
        element: (
          <AuthorizedRoute requiredPermission="view_all_meetings">
            <MeetingListing />
          </AuthorizedRoute>
        ),
      },
      {
        path: "meeting",
        element: (
          <AuthorizedRoute requiredPermission="add_meeting">
            <AddUpdateMeeting />
          </AuthorizedRoute>
        ),
      },
      {
        path: "meeting/:id",
        element: (
          <AuthorizedRoute requiredPermission="edit_meeting">
            <AddUpdateMeeting />
          </AuthorizedRoute>
        ),
      },

      {
        path: "settings/student-questions-listing",
        element: (
          <AuthorizedRoute requiredPermission="view_all_questions">
            <StudentQuestionsListing />
          </AuthorizedRoute>
        ),
      },
      {
        path: "settings/student-question",
        element: (
          <AuthorizedRoute requiredPermission="add_question">
            <AddUpdateStudentQuestions />
          </AuthorizedRoute>
        ),
      },
      {
        path: "settings/student-question/:id",
        element: (
          <AuthorizedRoute requiredPermission="edit_question">
            <AddUpdateStudentQuestions />
          </AuthorizedRoute>
        ),
      },
      {
        path: "auth-settings/admin",
        element: (
          <AuthorizedRoute requiredPermission="add_edit_admin_auth">
            <AdminAuth />
          </AuthorizedRoute>
        ),
      },
      {
        path: "auth-settings/student",
        element: (
          <AuthorizedRoute requiredPermission="add_edit_student_auth">
            <StudentAuth />
          </AuthorizedRoute>
        ),
      },
      {
        path: "auth-settings/trainer",
        element: (
          <AuthorizedRoute requiredPermission="add_edit_trainer_auth">
            <TrainerAuth />
          </AuthorizedRoute>
        ),
      },
      {
        path: "contact-inquiries",
        element: (
          <AuthorizedRoute requiredPermission="view_all_inquiries">
            <ContactInquiries />
          </AuthorizedRoute>
        ),
      },
      {
        path: "facilities-management/facilities-listing",
        element: (
          <AuthorizedRoute requiredPermission="view_all_facilities">
            <FacilitiesListing />
          </AuthorizedRoute>
        ),
      },
      {
        path: "facilities-management/facility/create",
        element: (
          <AuthorizedRoute requiredPermission="add_facility">
            <AddUpdateFacility />
          </AuthorizedRoute>
        ),
      },
      {
        path: "facilities-management/facility/edit/:id",
        element: (
          <AuthorizedRoute requiredPermission="edit_facility">
            <AddUpdateFacility />
          </AuthorizedRoute>
        ),
      },
      {
        path: "facilities-management/amenities-listing",
        element: (
          <AuthorizedRoute requiredPermission="view_all_amenities">
            <AmenitiesListing />
          </AuthorizedRoute>
        ),
      },
      {
        path: "facilities-management/space-types-listing",
        element: (
          <AuthorizedRoute requiredPermission="view_all_space_types">
            <SpaceTypesListing />
          </AuthorizedRoute>
        ),
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const RouteIndex = () => {
  return <RouterProvider router={router} />;
};

export default RouteIndex;
