import React from 'react';
import Cursor from '@/components/Cursor';
import ContentLayout from './content/layout';
import ContentLayoutPage from './content/page';

export default function Home() {
  return (
    <div>
      <Cursor />
      <ContentLayout>
        <ContentLayoutPage />
      </ContentLayout>
    </div>
  );
}