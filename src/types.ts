export interface Widget {
  id: string;
  type: string;
  title: string;
  content: string;
}

export interface WidgetData {
  [key: string]: any;
}