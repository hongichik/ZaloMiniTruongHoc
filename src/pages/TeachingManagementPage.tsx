import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Header,
  Tabs
} from 'zmp-ui';
import { PageLayout } from '@/components';
import { MyScheduleTab, SubstituteRegisterTab, HistoryTab } from '@/components/teaching';
import { ErrorBoundary } from '@/components/common';
import '@/css/teaching-management.scss';

interface TeachingManagementPageProps {}





const TeachingManagementPage: React.FC<TeachingManagementPageProps> = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('my-schedule');





  



  return (
    <ErrorBoundary>
      <PageLayout 
        title="Quản lý giờ dạy"
        className="teaching-management-page"
        customHeader={
          <Header 
            title="Quản lý giờ dạy" 
            showBackIcon={true}
            onBackClick={() => navigate("/home")}
          />
        }
      >
      
      {/* Tabs */}
      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        className="bg-white"
      >
        <Tabs.Tab key="my-schedule" label="Lịch của bạn">
          <MyScheduleTab />
        </Tabs.Tab>

        <Tabs.Tab key="substitute-register" label="Đăng ký dạy thay">
          <SubstituteRegisterTab />
        </Tabs.Tab>

        <Tabs.Tab key="history" label="Lịch sử">
          <HistoryTab />
        </Tabs.Tab>
      </Tabs>

      </PageLayout>
    </ErrorBoundary>
  );
};

export default TeachingManagementPage;
