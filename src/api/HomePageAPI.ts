// HomePageAPI.ts - API để lấy dữ liệu trang chủ

import type { HomepageResponse } from '@/types/homepage';
import { ApiUtils, API_ENDPOINTS } from '@/utils/api';

class HomePageAPI {
  /**
   * Lấy toàn bộ dữ liệu trang chủ
   */
  async getFullHomepage(): Promise<HomepageResponse> {
    try {
      console.log('🏠 Đang tải dữ liệu trang chủ...');
      
      const response = await fetch(ApiUtils.getFullURL('/homepage/full'), {
        method: 'GET',
        headers: ApiUtils.createHeaders(),
      });

      const data = await ApiUtils.handleResponse<HomepageResponse>(response);
      
      console.log('📊 Dữ liệu trang chủ:', data);
      
      return data;
    } catch (error) {
      console.error('💥 Lỗi tải trang chủ:', error);
      return ApiUtils.handleError(error, 'Lỗi kết nối khi tải trang chủ');
    }
  }

  /**
   * Lấy dữ liệu banner trường
   */
  async getSchoolBanner(): Promise<any> {
    try {
      const homepageData = await this.getFullHomepage();
      return homepageData.success ? homepageData.data.homepage.school_banner : null;
    } catch (error) {
      console.error('Lỗi tải banner trường:', error);
      return null;
    }
  }

  /**
   * Lấy dữ liệu slider banner
   */
  async getSliderBanner(): Promise<any> {
    try {
      const homepageData = await this.getFullHomepage();
      return homepageData.success ? homepageData.data.homepage.slider_banner : null;
    } catch (error) {
      console.error('Lỗi tải slider banner:', error);
      return null;
    }
  }

  /**
   * Lấy dữ liệu cơ sở vật chất
   */
  async getInfrastructure(): Promise<any> {
    try {
      const homepageData = await this.getFullHomepage();
      return homepageData.success ? homepageData.data.homepage.infrastructure : null;
    } catch (error) {
      console.error('Lỗi tải cơ sở vật chất:', error);
      return null;
    }
  }

  /**
   * Lấy dữ liệu video
   */
  async getVideos(): Promise<any> {
    try {
      const homepageData = await this.getFullHomepage();
      return homepageData.success ? homepageData.data.homepage.video : null;
    } catch (error) {
      console.error('Lỗi tải video:', error);
      return null;
    }
  }

  /**
   * Lấy dữ liệu hoạt động
   */
  async getActivities(): Promise<any> {
    try {
      const homepageData = await this.getFullHomepage();
      return homepageData.success ? homepageData.data.homepage.activities : null;
    } catch (error) {
      console.error('Lỗi tải hoạt động:', error);
      return null;
    }
  }

  /**
   * Lấy dữ liệu thành tích
   */
  async getAchievements(): Promise<any> {
    try {
      const homepageData = await this.getFullHomepage();
      return homepageData.success ? homepageData.data.homepage.achievement : null;
    } catch (error) {
      console.error('Lỗi tải thành tích:', error);
      return null;
    }
  }

  /**
   * Lấy dữ liệu liên hệ
   */
  async getContact(): Promise<any> {
    try {
      const homepageData = await this.getFullHomepage();
      return homepageData.success ? homepageData.data.homepage.contact : null;
    } catch (error) {
      console.error('Lỗi tải thông tin liên hệ:', error);
      return null;
    }
  }

  /**
   * Lấy dữ liệu thông báo
   */
  async getNotification(): Promise<any> {
    try {
      const homepageData = await this.getFullHomepage();
      return homepageData.success ? homepageData.data.homepage.notification : null;
    } catch (error) {
      console.error('Lỗi tải thông báo:', error);
      return null;
    }
  }


}

// Export singleton instance
const homePageAPI = new HomePageAPI();
export default homePageAPI;

// Export types
export type { HomepageResponse } from '@/types/homepage';