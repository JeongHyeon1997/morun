import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class UsersService {
  constructor(private readonly supabase: SupabaseService) {}

  async findById(id: string) {
    const { data, error } = await this.supabase.admin
      .from('profiles')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    if (!data) throw new NotFoundException('user not found');
    return data;
  }

  async checkNicknameAvailable(nickname: string) {
    const { data, error } = await this.supabase.admin
      .from('profiles')
      .select('id')
      .eq('nickname', nickname)
      .maybeSingle();
    if (error) throw error;
    return { available: !data };
  }
}
