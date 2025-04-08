import { Rating } from "@mui/material";
import { getAuthPageService } from "../services/authPageService";
import { S3 } from "../config";

export const RatingStars = ({ rating }) => {
  return (
    <Rating
      value={rating}
      size="small"
      readOnly // Makes it non-interactive
    />
  );
};

export const editorOptions = {
  height: 200,
  buttonList: [
    ["undo", "redo"],
    [
      "bold",
      "underline",
      "italic",
      "strike",
      "font",
      "fontSize",
      "underline",
      "image",
    ],
    ["removeFormat", "link"],
    ["fontColor", "hiliteColor"],
    ["align", "horizontalRule", "list"],
    ["fullScreen", "showBlocks", "codeView"],
    ["preview", "print"],
  ],
  imageUploadUrl: "",
  font: [
    "Roboto",
    "Helvetica",
    "Arial",
    "sans-serif",
    "Comic Sans MS",
    "Courier New",
    "Impact",
    "Georgia",
    "Tahoma",
    "Trebuchet MS",
    "Verdana",
    "Logical",
    "Salesforce Sans",
    "Garamond",
    "Times New Roman",
  ],
  fontSize: [12, 14, 16, 18, 20],
  colorList: [
    [
      "#828282",
      "#FF5400",
      "#676464",
      "#F1F2F4",
      "#FF9B00",
      "#F00",
      "#fa6e30",
      "#000",
      "#FF6600",
      "#0099FF",
      "#74CC6D",
      "#FF9900",
      "#CCCCCC",
    ],
  ],
};

export const generateSlug = (text) => {
  return text
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing spaces
    .replace(/[^a-z0-9\s-]/g, "") // Allow only letters, numbers, spaces, and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Remove multiple consecutive hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading & trailing hyphens
};

export const statusOptions = [
  { value: "1", label: "Active" },
  { value: "0", label: "Inactive" },
];

export const statType = [
  { value: "number", label: "Number" },
  { value: "percentage", label: "Percentage" },
];

export const statusBooleanOptions = [
  { value: true, label: "Active" },
  { value: false, label: "Inactive" },
];

export const rtlOptions = [
  { value: "1", label: "1" },
  { value: "0", label: "0" },
];

export const sessionTypeOptions = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
];

export const ratingOptions = [
  { value: 1, label: "1 Star" },
  { value: 2, label: "2 Stars" },
  { value: 3, label: "3 Star" },
  { value: 4, label: "4 Stars" },
  { value: 5, label: "5 Star" },
];

export const difficultyOptions = [
  { value: true, label: "Yes" },
  { value: false, label: "No" },
];

export const trendingOptions = [
  { value: true, label: "Yes" },
  { value: false, label: "No" },
];

export const featuredOptions = [
  { value: true, label: "Yes" },
  { value: false, label: "No" },
];

export const certificateOptions = [
  { value: true, label: "Yes" },
  { value: false, label: "No" },
];

export const userType = [
  { value: "instructor", label: "Instructor" },
  { value: "student", label: "Student" },
];

export const fetchAuthData = async ({ queryKey }) => {
  const [_, page_key, lang] = queryKey;
  const response = await getAuthPageService(page_key, lang);
  return response?.result;
};

export const getImageSize = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl, { method: "HEAD" });
    const sizeInBytes = response.headers.get("content-length"); // Get size

    if (sizeInBytes) {
      return (sizeInBytes / 1024).toFixed(2) + " KB"; // Convert to KB
    } else {
      return "Size not available";
    }
  } catch (error) {
    return "Size not available";
  }
};

export const getS3ImageUrl = (module, imageName) => {
  if (!module || !imageName) return null;
  return `${S3}/${module}/${imageName}`;
};

export const socialMediaLinks = [
  {
    name: "WhatsApp",
    icon: "WhatsApp", // Material Icons name
    label: "social_whatsapp",
    link: "https://wa.me/your-number",
  },
  {
    name: "Snapchat",
    icon: "Snapchat", // Material Icons name
    label: "social_snapchat",
    link: "https://www.snapchat.com/add/your-username",
  },
  {
    name: "TikTok",
    icon: "MusicNote", // Closest Material Icon for TikTok
    label: "social_tiktok",
    link: "https://www.tiktok.com/@your-username",
  },
  {
    name: "Facebook",
    icon: "Facebook",
    label: "social_facebook",
    link: "https://www.facebook.com/your-profile",
  },
  {
    name: "Twitter",
    icon: "Twitter",
    label: "social_twitter",
    link: "https://twitter.com/your-handle",
  },
  {
    name: "Instagram",
    icon: "Instagram",
    label: "social_instagram",
    link: "https://www.instagram.com/your-username",
  },
  {
    name: "YouTube",
    icon: "YouTube",
    label: "social_youtube",
    link: "https://www.youtube.com/channel/your-channel-id",
  },
  {
    name: "LinkedIn",
    icon: "LinkedIn",
    label: "social_linkedin",
    link: "https://www.linkedin.com/in/your-profile",
  },
];
