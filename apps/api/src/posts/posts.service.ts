import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import type { CreatePostInput, PostScope } from '@morun/shared';

@Injectable()
export class PostsService {
  constructor(private readonly supabase: SupabaseService) {}

  async list(scope: PostScope = 'public', crewId?: string) {
    let q = this.supabase.admin
      .from('posts')
      .select('*, author:profiles(nickname, avatar_url)')
      .order('created_at', { ascending: false })
      .limit(50);
    q = q.eq('scope', scope);
    if (scope === 'crew' && crewId) q = q.eq('crew_id', crewId);
    const { data, error } = await q;
    if (error) throw error;
    return data;
  }

  async create(userId: string, input: CreatePostInput, crewId: string | null) {
    const { data, error } = await this.supabase.admin
      .from('posts')
      .insert({
        author_id: userId,
        crew_id: input.scope === 'crew' ? crewId : null,
        scope: input.scope,
        title: input.title,
        content: input.content,
        image_urls: input.imageUrls ?? [],
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}
