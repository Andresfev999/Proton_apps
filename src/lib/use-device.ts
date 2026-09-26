'use client';

import { useState, useEffect } from 'react';

export type DeviceType = 'android' | 'ios' | 'desktop';

export function useDeviceType(): {
  device: DeviceType;
  isAndroid: boolean;
  isIOS: boolean;
  isDesktop: boolean;
  isMobile: boolean;
} {
  const [device, setDevice] = useState<DeviceType>('desktop');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ua = navigator.userAgent || navigator.vendor || (window as unknown as { opera?: string }).opera || '';

    if (/android/i.test(ua)) {
      setDevice('android');
    } else if (/iPad|iPhone|iPod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream) {
      setDevice('ios');
    } else {
      setDevice('desktop');
    }
  }, []);

  return {
    device,
    isAndroid: device === 'android',
    isIOS: device === 'ios',
    isDesktop: device === 'desktop',
    isMobile: device === 'android' || device === 'ios'
  };
}
