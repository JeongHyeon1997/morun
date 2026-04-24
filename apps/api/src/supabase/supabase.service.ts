import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

/**
 * Supabase 클라이언트를 관리하는 서비스.
 * - admin: service_role 키 사용. RLS 우회. 서버 사이드 비즈니스 로직 전용.
 * - asUser: 특정 유저의 JWT로 RLS가 적용된 클라이언트를 얻을 때 사용.
 */
@Injectable()
export class SupabaseService implements OnModuleInit {
  private readonly logger = new Logger(SupabaseService.name);
  private url!: string;
  private anonKey!: string;
  private serviceRoleKey!: string;

  admin!: SupabaseClient;

  constructor(private readonly config: ConfigService) {}

  onModuleInit() {
    this.url = this.config.getOrThrow('SUPABASE_URL');
    this.anonKey = this.config.getOrThrow('SUPABASE_ANON_KEY');
    this.serviceRoleKey = this.config.getOrThrow('SUPABASE_SERVICE_ROLE_KEY');

    this.admin = createClient(this.url, this.serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    this.logger.log(`Supabase client ready (${this.url})`);
  }

  /** 유저의 access token을 실어 RLS가 적용된 클라이언트 반환 */
  asUser(accessToken: string): SupabaseClient {
    return createClient(this.url, this.anonKey, {
      global: { headers: { Authorization: `Bearer ${accessToken}` } },
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }
}
