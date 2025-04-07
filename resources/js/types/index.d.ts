import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface flash {
    success : string
    info : string,
    warning : string
    error : string
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    flash : flash;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export type gender = 'Laki-Laki' | 'Perempuan'
export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    email_verified_at: string | null;
    phonenumber:string;
    gender : gender
    birthday:string
    profile_picture : string;
    created_at: string;
    updated_at: string; // This allows for additional properties...
}
