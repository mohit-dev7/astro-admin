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
            url: '/dashboard/timeslot'
          },
          {
            id: 'holiday_list',
            title: 'Holiday List',
            type: 'item',
            url: '/dashboard/holiday'
          },
          {
            id: 'promo_code',
            title: 'Promo Code',
            type: 'item',
            url: '/dashboard/promocode'
          }
        ]
      },
      // {
      //   id: 'appointments',
      //   title: 'Appointments',
      //   type: 'collapse',
      //   icon: 'feather icon-clock',
      //   children: [
      //     {
      //       id: 'search_appointments',
      //       title: 'Appointments',
      //       type: 'item',
      //       url: '/dashboard/appointments'
      //     },
      //     {
      //       id: 'pending_appointments',
      //       title: 'Pending Appointments',
      //       type: 'item',
      //       url: '/dashboard/pending-appointments'
      //     },
      //     {
      //       id: 'cancelled_appointments',
      //       title: 'Cancelled Appointments',
      //       type: 'item',
      //       url: '/basic/breadcrumb-paging'
      //     },
      //     {
      //       id: 'completed_appointments',
      //       title: 'Completed Appointments',
      //       type: 'item',
      //       url: '/basic/collapse'
      //     },
      //     {
      //       id: '',
      //       title: ' Appointments List',
      //       type: 'item',
      //       url: '/dashboard/promocode'
      //     }
      //   ]
      // },
      {
        id: 'appointment',
        title: 'Appointment',
        type: 'item',
        url: '/dashboard/appointments',
        icon: 'feather icon-calendar',
        classes: 'nav-item',
      },
      {
        id: 'contact',
        title: 'Contact',
        type: 'item',
        url: '/dashboard/contactd',
        icon: 'feather icon-phone',
        classes: 'nav-item',
      },
      {
        id: 'enquire',
        title: 'Enquire',
        type: 'item',
        url: '/dashboard/enquire',
        icon: 'feather icon-message-square',
        classes: 'nav-item',
      },
      {
        id: 'feedback',
        title: 'Feedback',
        type: 'item',
        url: '/dashboard/feedback',
        icon: 'feather icon-square',
        classes: 'nav-item',
      },
      {
        id: 'blog',
        title: 'Blog',
        type: 'item',
        url: '/dashboard/blog',
        icon: 'feather icon-bold',
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
