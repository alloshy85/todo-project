/*
 *   Copyright (c) 2025 
 *   All rights reserved.
 */
export interface Todo {
  _id?: string;
  title: string;
  description?: string;
  status: 'To Do' | 'In Progress' | 'Done';
  updatedAt?: Date;
  showFullDescription?: boolean;
}