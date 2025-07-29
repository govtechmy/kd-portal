import React from 'react';
import { 
  Button, 
  Input, 
  Tag,
  Spinner
} from '@/components/ui/myds-wrapper';

export const MYDSTest: React.FC = () => {
  return (
    <div className="p-8 space-y-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">MYDS Component Test</h1>
      
      {/* Button Tests */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Buttons</h2>
        <div className="flex gap-4 flex-wrap">
          <Button variant="primary-fill" size="medium">Primary Fill</Button>
          <Button variant="primary-outline" size="medium">Primary Outline</Button>
          <Button variant="default-outline" size="medium">Default Outline</Button>
          <Button variant="default-ghost" size="medium">Default Ghost</Button>
          <Button variant="danger-fill" size="medium">Danger Fill</Button>
        </div>
        
        <div className="flex gap-4 flex-wrap">
          <Button variant="primary-fill" size="small">Small</Button>
          <Button variant="primary-fill" size="medium">Medium</Button>
          <Button variant="primary-fill" size="large">Large</Button>
        </div>
      </section>

      {/* Input Tests */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Inputs</h2>
        <div className="space-y-2">
          <Input placeholder="Enter text here" />
          <Input placeholder="Disabled input" disabled />
        </div>
      </section>

      {/* Tag Tests */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Tags</h2>
        <div className="flex gap-2 flex-wrap">
          <Tag>Default Tag</Tag>
          <Tag variant="success">Success Tag</Tag>
          <Tag variant="warning">Warning Tag</Tag>
          <Tag variant="danger">Danger Tag</Tag>
        </div>
      </section>

      {/* Spinner Test */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Spinner</h2>
        <Spinner />
      </section>
    </div>
  );
}; 