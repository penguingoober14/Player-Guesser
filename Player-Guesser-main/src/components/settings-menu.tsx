'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings, Moon, Sun } from 'lucide-react';

export function SettingsMenu() {
  const { theme, setTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-6 w-6" />
          <span className="sr-only">Open settings</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Settings</h4>
            <p className="text-sm text-muted-foreground">
              Adjust your app settings.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode" className="flex items-center gap-2">
                <Sun className="h-5 w-5" />
                Dark Mode
                <Moon className="h-5 w-5" />
              </Label>
              <Switch
                id="dark-mode"
                checked={theme === 'dark'}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
