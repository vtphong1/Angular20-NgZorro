export enum ESelectType {
  select = 'select',
  date_time = 'date_time',
  date_time_picker = 'date_time_picker',
  number = 'number',
  text = 'text'
}

export enum EModeType {
  multiple = 'multiple',
  default = 'default',
  tags = 'tags',
}

export type ModeSelectType = 'multiple' | 'default' | 'tags';
