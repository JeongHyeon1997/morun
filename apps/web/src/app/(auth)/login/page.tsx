'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Button,
  IconChevron,
  SocialButton,
  TextField,
  type SocialProvider,
} from '@/components/atoms';
import { useAuthStore } from '@/lib/auth/store';

export default function LoginPage() {
  const router = useRouter();
  const setSession = useAuthStore((s) => s.setSession);
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const canSubmit =
    nickname.trim().length >= 2 && password.length >= 1 && !submitting;

  const onSocial = (provider: SocialProvider) => {
    // TODO(auth): trigger OAuth flow per provider.
    //   - google / apple: Supabase signInWithOAuth({ provider })
    //   - kakao / naver: SDK + custom backend exchange (POST /auth/oauth/<p>)
    console.warn(`[social-login] ${provider} not yet wired`);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    // TODO(auth): replace with real /auth/login call (axios + signInSchema).
    // For now, populate the auth store with the entered identity so the rest
    // of the app can consume session state during UI development.
    const trimmed = nickname.trim();
    setSession(
      {
        id: `local-${trimmed}`,
        nickname: trimmed,
        email: `${trimmed}@morun.local`,
        name: trimmed,
        avatarUrl: null,
      },
      'dev-token',
    );
    router.push('/');
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[428px] flex-col bg-white">
      <header className="relative flex h-20 shrink-0 items-center justify-center px-5">
        <Link
          href="/"
          aria-label="뒤로 가기"
          className="absolute left-5 inline-flex h-5 w-5 items-center justify-center"
        >
          <IconChevron direction="left" size={20} color="#3C3C3C" />
        </Link>
        <h1 className="text-xl font-medium tracking-[-0.4px] text-ink">로그인</h1>
      </header>

      <form onSubmit={onSubmit} className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col px-[30px]">
          <p className="mt-[60px] text-center text-2xl leading-8 tracking-[-0.48px] text-ink">
            <span className="font-semibold text-tab-bar-dark">MO:RUN</span>
            <span className="font-normal">에 오신걸</span>
            <br />
            <span className="font-normal">환영합니다 </span>
            <span className="font-semibold text-tab-bar-dark">:D</span>
          </p>

          <div className="mt-[60px] flex flex-col gap-5">
            <TextField
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임 입력"
              autoComplete="username"
              inputMode="text"
              aria-label="닉네임"
            />
            <TextField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
              autoComplete="current-password"
              aria-label="비밀번호"
              showToggle
            />
          </div>

          <nav className="mt-6 flex items-center justify-center gap-4 text-sm tracking-[-0.28px] text-ink">
            <Link href="/" className="hover:underline">
              아이디 찾기
            </Link>
            <span aria-hidden className="block h-2.5 w-px bg-input-placeholder" />
            <Link href="/" className="hover:underline">
              비밀번호 찾기
            </Link>
            <span aria-hidden className="block h-2.5 w-px bg-input-placeholder" />
            <Link href="/signup" className="hover:underline">
              회원가입
            </Link>
          </nav>

          <div className="mt-10 flex items-center gap-3">
            <span className="h-px flex-1 bg-input-placeholder" aria-hidden />
            <span className="text-xs text-input-placeholder">또는</span>
            <span className="h-px flex-1 bg-input-placeholder" aria-hidden />
          </div>

          <div className="mt-5 flex justify-center gap-4">
            {(['kakao', 'naver', 'google', 'apple'] as SocialProvider[]).map(
              (p) => (
                <SocialButton
                  key={p}
                  provider={p}
                  onClick={() => onSocial(p)}
                  disabled={submitting}
                />
              ),
            )}
          </div>

          <div className="flex-1" />

          <Link href="/docs" className="self-center pb-4 text-xs text-black hover:underline">
            개인정보처리방침
          </Link>
        </div>

        <Button type="submit" disabled={!canSubmit}>
          로그인하기
        </Button>
      </form>
    </div>
  );
}
