'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUpSchema } from '@morun/shared';
import { Button, IconChevron, TextField } from '@/components/atoms';
import { useAuthStore } from '@/lib/auth/store';

type NicknameStatus = 'idle' | 'checking' | 'available' | 'taken';

export default function SignupPage() {
  const router = useRouter();
  const setSession = useAuthStore((s) => s.setSession);

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickStatus, setNickStatus] = useState<NicknameStatus>('idle');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parsed = signUpSchema.safeParse({ nickname, email, password });
  const canSubmit = parsed.success && nickStatus === 'available' && !submitting;

  const handleNicknameCheck = async () => {
    if (nickname.trim().length < 2) return;
    setNickStatus('checking');
    // TODO(api): call GET /users/nickname-available?nickname=...
    await new Promise((r) => setTimeout(r, 300));
    setNickStatus('available');
  };

  const onNicknameChange = (v: string) => {
    setNickname(v);
    if (nickStatus !== 'idle') setNickStatus('idle');
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || !parsed.success) return;
    setError(null);
    setSubmitting(true);
    // TODO(auth): replace with real /auth/signup call.
    setSession(
      {
        id: `local-${parsed.data.nickname}`,
        nickname: parsed.data.nickname,
        email: parsed.data.email,
        name: parsed.data.nickname,
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
          href="/login"
          aria-label="뒤로 가기"
          className="absolute left-5 inline-flex h-5 w-5 items-center justify-center"
        >
          <IconChevron direction="left" size={20} color="#3C3C3C" />
        </Link>
        <h1 className="text-xl font-medium tracking-[-0.4px] text-ink">회원가입</h1>
      </header>

      <form onSubmit={onSubmit} className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col px-[30px]">
          <div className="mt-10 flex flex-col gap-5">
            <div className="flex items-end gap-2.5">
              <div className="flex-1">
                <TextField
                  value={nickname}
                  onChange={(e) => onNicknameChange(e.target.value)}
                  placeholder="닉네임 입력"
                  autoComplete="username"
                  aria-label="닉네임"
                />
              </div>
              <Button
                type="button"
                variant={nickStatus === 'available' ? 'primary' : 'secondary'}
                size="pill"
                fullWidth={false}
                disabled={nickname.trim().length < 2 || nickStatus === 'checking'}
                onClick={handleNicknameCheck}
                className="shrink-0"
              >
                {nickStatus === 'available' ? '사용 가능' : '중복 확인하기'}
              </Button>
            </div>

            <TextField
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 입력"
              autoComplete="email"
              inputMode="email"
              aria-label="이메일"
            />

            <TextField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 (8자 이상)"
              autoComplete="new-password"
              aria-label="비밀번호"
              showToggle
            />
          </div>

          {error && <p className="mt-3 text-sm text-danger">{error}</p>}

          <div className="flex-1" />

          <p className="self-center pb-4 text-xs text-input-placeholder">
            가입하면 <Link href="/docs" className="underline">이용약관</Link> 및{' '}
            <Link href="/docs" className="underline">개인정보처리방침</Link>에 동의한 것으로 간주됩니다
          </p>
        </div>

        <Button type="submit" disabled={!canSubmit}>
          {submitting ? '가입 중…' : '가입하기'}
        </Button>
      </form>
    </div>
  );
}
