export interface MeetingsItem {
    name: string;
    start_time: string;
    duration: number;
    categories: string[] | null;
    description: string;
    location: string | null;
  }