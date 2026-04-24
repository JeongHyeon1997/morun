import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class CrewsService {
  constructor(private readonly supabase: SupabaseService) {}

  async list() {
    const { data, error } = await this.supabase.admin
      .from('crews')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }

  async checkNameAvailable(name: string) {
    const { data, error } = await this.supabase.admin
      .from('crews')
      .select('id')
      .eq('name', name)
      .maybeSingle();
    if (error) throw error;
    return { available: !data };
  }
}
