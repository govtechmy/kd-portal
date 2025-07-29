import React from 'react';

// MYDS Component imports
export { Button } from '@govtechmy/myds-react/button';
export { Input } from '@govtechmy/myds-react/input';
export { Select } from '@govtechmy/myds-react/select';
export { TextArea } from '@govtechmy/myds-react/textarea';
export { Checkbox } from '@govtechmy/myds-react/checkbox';
export { Radio } from '@govtechmy/myds-react/radio';
export { DateField } from '@govtechmy/myds-react/date-field';
export { DatePicker } from '@govtechmy/myds-react/date-picker';
export { DateRangePicker } from '@govtechmy/myds-react/daterange-picker';
export { Table } from '@govtechmy/myds-react/table';
export { Pagination } from '@govtechmy/myds-react/pagination';
export { Breadcrumb } from '@govtechmy/myds-react/breadcrumb';
export { Accordion } from '@govtechmy/myds-react/accordion';
export { Dialog } from '@govtechmy/myds-react/dialog';
export { Tabs } from '@govtechmy/myds-react/tabs';
export { Tag } from '@govtechmy/myds-react/tag';
export { AutoToast as Toast } from '@govtechmy/myds-react/toast';
export { Tooltip } from '@govtechmy/myds-react/tooltip';
export { Toggle } from '@govtechmy/myds-react/toggle';
export { Spinner } from '@govtechmy/myds-react/spinner';
export { SearchBar } from '@govtechmy/myds-react/search-bar';
export { Label } from '@govtechmy/myds-react/label';
export { Link } from '@govtechmy/myds-react/link';
export { AlertDialog } from '@govtechmy/myds-react/alert-dialog';
export { AnnounceBar } from '@govtechmy/myds-react/announce-bar';
export { Callout } from '@govtechmy/myds-react/callout';
export { CookieBanner } from '@govtechmy/myds-react/cookie-banner';
export { DataTable } from '@govtechmy/myds-react/data-table';
export { Dropdown } from '@govtechmy/myds-react/dropdown';
export { Footer } from '@govtechmy/myds-react/footer';
export { Masthead } from '@govtechmy/myds-react/masthead';
export { Navbar } from '@govtechmy/myds-react/navbar';
export { Pill } from '@govtechmy/myds-react/pill';
export { Skiplink } from '@govtechmy/myds-react/skiplink';
export { SummaryList } from '@govtechmy/myds-react/summary-list';
export { ThemeSwitch } from '@govtechmy/myds-react/theme-switch';

// MYDS Hooks
export { usePagination, useTheme, useToast } from '@govtechmy/myds-react/hooks';

// Migration helper component
interface MigrationWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const MigrationWrapper: React.FC<MigrationWrapperProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div className={`myds-migration-wrapper ${className}`}>
      {children}
    </div>
  );
}; 