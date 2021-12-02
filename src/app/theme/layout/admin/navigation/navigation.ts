import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}
const NavigationItems = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard/default',
        icon: 'feather icon-home',
        classes: 'nav-item',
      },
      {
        id: 'users',
        title: 'Users',
        type: 'item',
        url: '/dashboard/users',
        icon: 'feather icon-user',
        classes: 'nav-item',
      },
      {
        id: 'master',
        title: 'Master',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'country',
            title: 'Country',
            type: 'item',
            url: '/dashboard/country'
          },
          {
            id: 'rate_list',
            title: 'Rate List',
            type: 'item',
            url: '/dashboard/ratelist'
          },
          {
            id: 'time_slot',
            title: 'Time Slot',
            type: 'item',
            url: '/basic/breadcrumb-paging'
          },
          {
            id: 'holiday_list',
            title: 'Holiday List',
            type: 'item',
            url: '/basic/collapse'
          },
          {
            id: 'promo_code',
            title: 'Promo Code',
            type: 'item',
            url: '/basic/tabs-pills'
          }
        ]
      },
      {
        id: 'appointments',
        title: 'Appointments',
        type: 'collapse',
        icon: 'feather icon-clock',
        children: [
          {
            id: 'search_appointments',
            title: 'Appointments',
            type: 'item',
            url: '/dashboard/appointments'
          },
          {
            id: 'pending_appointments',
            title: 'Pending Appointments',
            type: 'item',
            url: '/dashboard/pending-appointments'
          },
          {
            id: 'cancelled_appointments',
            title: 'Cancelled Appointments',
            type: 'item',
            url: '/basic/breadcrumb-paging'
          },
          {
            id: 'completed_appointments',
            title: 'Completed Appointments',
            type: 'item',
            url: '/basic/collapse'
          },
          {
            id: 'refund',
            title: 'Refund Appointments List',
            type: 'item',
            url: '/basic/tabs-pills'
          }
        ]
      },
      {
        id: 'contact',
        title: 'Contact',
        type: 'item',
        url: '/dashboard/contact',
        icon: 'feather icon-phone',
        classes: 'nav-item',
      },
      {
        id: 'enquire',
        title: 'Enquire',
        type: 'item',
        url: '/dashboard/enquire',
        icon: 'feather icon-home',
        classes: 'nav-item',
      },
      {
        id: 'feedback',
        title: 'Feedback',
        type: 'item',
        url: '/dashboard/feedback',
        icon: 'feather icon-home',
        classes: 'nav-item',
      }
    ]
  },
  
];



@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
