'use client';

import { User } from '@supabase/supabase-js';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface UserMenuProps {
  user: User;
}

interface UserInfo {
  expires_at: string | null;
}

export function UserMenu({ user }: UserMenuProps) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('expires_at')
          .eq('id', user.id)
          .single();

        if (data) {
          setUserInfo(data);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }

    fetchUserInfo();
  }, [user.id]);

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <Popover>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/10 cursor-pointer">
                <img
                  src={user.user_metadata.avatar_url}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
            </PopoverTrigger>
          </TooltipTrigger>

          <TooltipContent side="bottom">
            <p className="text-sm">{user.email}</p>
          </TooltipContent>

          <PopoverContent className="w-auto px-4 py-3" side="bottom" align="end">
            <p className="text-sm font-medium">{user.email}</p>
            {userInfo?.expires_at && (
              <p className="text-xs text-gray-500 mt-1">
                Pro access expires: {new Date(userInfo.expires_at).toLocaleDateString()}
              </p>
            )}
          </PopoverContent>
        </Popover>
      </Tooltip>
    </TooltipProvider>
  );
}
