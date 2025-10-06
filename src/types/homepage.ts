// Homepage API Types
export interface HomepageResponse {
  success: boolean;
  message: string;
  data: {
    homepage: HomepageData;
    meta: HomepageMeta;
  };
}

export interface HomepageData {
  school_banner: SchoolBanner;
  slider_banner: SliderBanner;
  infrastructure: Infrastructure;
  video: VideoSection;
  activities: Activities;
  achievement: Achievement;
  contact: Contact;
  notification: Notification;
}

export interface HomepageMeta {
  total_sections: number;
  last_updated: string;
  generated_at: string;
}

export interface SchoolBanner {
  id: number;
  content_key: string;
  title: string;
  content: {
    subtitle: string;
    main_title: string;
    button_link?: string;
    button_text?: string;
    description: string;
    image_alt_text: string;
    banner_img?: string;
  };
  media_urls: (string | null)[];
  display_order: number;
  updated_at: string;
}

export interface SliderBanner {
  id: number;
  content_key: string;
  title: string;
  content: {
    slides: SliderSlide[];
    auto_slide_duration: number;
  };
  media_urls: string[];
  display_order: number;
  updated_at: string;
}

export interface SliderSlide {
  id?: number;
  emoji: string;
  title: string;
  gradient: string;
  subtitle: string;
  button_text: string;
  placeholder: string;
  article_link: string;
  banner?: string;
}

export interface Infrastructure {
  id: number;
  content_key: string;
  title: string;
  content: {
    images: InfrastructureImage[];
    main_title?: string;
    description?: string;
    section_icon?: string | null;
    section_title?: string;
  };
  media_urls: (string | null)[];
  display_order: number;
  updated_at: string;
}

export interface InfrastructureImage {
  icon: string | null;
  title: string;
  alt_text: string;
  placeholder: string;
  banner?: string;
}

export interface VideoSection {
  id: number;
  content_key: string;
  title: string;
  content: {
    videos: VideoItem[];
    main_title: string;
    description: string;
    main_video_url: string;
  };
  media_urls: string[];
  display_order: number;
  updated_at: string;
}

export interface VideoItem {
  title: string;
  duration: string;
  placeholder: string;
}

export interface Activities {
  id: number;
  content_key: string;
  title: string;
  content: {
    activities: ActivityItem[];
    main_title: string;
    description: string;
  };
  media_urls: string[];
  display_order: number;
  updated_at: string;
}

export interface ActivityItem {
  icon: string;
  title: string;
  placeholder: string;
}

export interface Achievement {
  id: number;
  content_key: string;
  title: string;
  content: {
    main_title: string;
    description: string;
    achievements: AchievementItem[];
  };
  media_urls: string[] | null;
  display_order: number;
  updated_at: string;
}

export interface AchievementItem {
  icon: string;
  text: string;
  year: string;
}

export interface Contact {
  id: number;
  content_key: string;
  title: string;
  content: {
    main_title: string;
    description: string;
    contact_details: ContactDetails;
  };
  media_urls: string[] | null;
  display_order: number;
  updated_at: string;
}

export interface ContactDetails {
  fax: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  youtube: string;
  facebook: string;
  working_hours: string;
}

export interface Notification {
  id: number;
  content_key: string;
  title: string;
  content: {
    icon: string;
    main_title: string;
    button_link: string;
    button_text: string;
    description: string;
    notice_text: string;
  };
  media_urls: string[] | null;
  display_order: number;
  updated_at: string;
}