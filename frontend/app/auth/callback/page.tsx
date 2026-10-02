"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function completeConfirmation() {
      try {
        const params = new URLSearchParams(window.location.search);
        const callbackError = params.get("error_description");

        if (callbackError) {
          throw new Error(callbackError);
        }

        const code = params.get("code");

        if (code) {
          const { error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(code);

          if (exchangeError) {
            throw exchangeError;
          }
        }

        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        if (!session) {
          throw new Error(
            "This confirmation link is invalid or expired. Return to signup and request a new email.",
          );
        }

        if (active) {
          window.location.replace("/dashboard");
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to confirm your email.",
          );
        }
      }
    }

    void completeConfirmation();

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f8fa] p-6">
      <section className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold">Confirming your email</h1>
        {error ? (
          <>
            <p role="alert" className="mt-4 text-sm text-red-600">
              {error}
            </p>
            <Link
              href="/signup"
              className="mt-6 inline-block text-sm font-medium text-blue-600 hover:underline"
            >
              Return to signup
            </Link>
          </>
        ) : (
          <p className="mt-3 text-sm text-gray-500">
            Please wait while we finish setting up your account.
          </p>
        )}
      </section>
    </main>
  );
}