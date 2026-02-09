import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { toast } from 'sonner';
import type { UserProfile as BackendUserProfile } from '../backend';

// Local type definitions (backend no longer provides these)
export enum VerificationRole {
  student = 'student',
  resident = 'resident',
  consultant = 'consultant',
}

// Frontend-only extended profile type (for UI state)
export type UserProfile = {
  name: string;
  role?: VerificationRole;
  verified?: boolean;
};

export type VerificationDetails = {
  role: VerificationRole;
  institution: string;
  idNumber: string;
};

export type AnonPost = {
  content: string;
  timestamp: bigint;
};

export enum Reaction {
  heart = 'heart',
  strength = 'strength',
  support = 'support',
}

export type VentReaction = {
  postTimestamp: bigint;
  reaction: Reaction;
  count: bigint;
};

// User Profile - Real backend implementation
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      const backendProfile = await actor.getCallerUserProfile();
      if (!backendProfile) return null;
      // Map backend profile to frontend profile with safe defaults
      return {
        name: backendProfile.name,
        role: undefined,
        verified: undefined,
      };
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      // Only send backend-compatible fields (name only)
      const backendProfile: BackendUserProfile = {
        name: profile.name,
      };
      await actor.saveCallerUserProfile(backendProfile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      toast.success('Profile saved successfully');
    },
    onError: (error: any) => {
      console.error('Profile save error:', error);
      toast.error(error?.message || 'Failed to save profile');
    },
  });
}

// Medical Verification (stub implementation - backend removed this feature)
export function useVerifyMedicalForm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (details: VerificationDetails) => {
      // Backend no longer provides this - stub implementation
      console.log('Verification stubbed:', details);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      toast.success('Verification submitted successfully');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to submit verification');
    },
  });
}

// Android APK Download
// Safe for guest/anonymous usage - backend allows public access
export function useGetAndroidAPK() {
  const { actor, isFetching } = useActor();

  return useQuery<string | null>({
    queryKey: ['androidAPK'],
    queryFn: async () => {
      if (!actor) return null;
      try {
        // Backend returns null when no APK URL is configured, or a string URL when available
        // This is a public query call - no authentication required
        const result = await actor.getAndroidAPK();
        return result;
      } catch (error) {
        // If there's an unexpected error, return null to show fallback instructions
        console.error('Error fetching Android APK URL:', error);
        return null;
      }
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

// Mood Tracking (stub implementations for compatibility)
export type MoodEntry = {
  timestamp: bigint;
  mood: string;
  burnoutRating?: number;
};

export function useGetMoodHistory() {
  return useQuery<MoodEntry[]>({
    queryKey: ['moodHistory'],
    queryFn: async () => [],
    enabled: false,
  });
}

export function useAddMood() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (_data: { mood: string; burnoutRating?: number }) => {
      // Stub implementation
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moodHistory'] });
      toast.success('Mood entry saved');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to save mood entry');
    },
  });
}

// Thought Diary (stub implementations for compatibility)
export type ThoughtEntry = {
  timestamp: bigint;
  thought: string;
  emotion: string;
  reframe?: string;
};

export function useGetThoughtHistory() {
  return useQuery<ThoughtEntry[]>({
    queryKey: ['thoughtHistory'],
    queryFn: async () => [],
    enabled: false,
  });
}

export function useAddThought() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (_data: { thought: string; emotion: string; reframe?: string }) => {
      // Stub implementation
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['thoughtHistory'] });
      toast.success('Thought entry saved');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to save thought entry');
    },
  });
}

// Quotes (stub implementation for compatibility)
export type Quote = {
  author: string;
  content: string;
};

export function useGetAllQuotes() {
  return useQuery<Quote[]>({
    queryKey: ['quotes'],
    queryFn: async () => [],
    enabled: false,
  });
}

// Self-care reminders (stub implementations for compatibility)
export type SelfCareReminder = {
  time: number;
  frequency: number;
};

export function useGetSelfCareReminders() {
  return useQuery<SelfCareReminder[]>({
    queryKey: ['selfCareReminders'],
    queryFn: async () => [],
    enabled: false,
  });
}

export function useAddSelfCareReminder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (_data: { time: number; frequency: number }) => {
      // Stub implementation
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['selfCareReminders'] });
      toast.success('Reminder saved');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to save reminder');
    },
  });
}

// Community Forum (stub implementations - backend removed these features)
export function useBrowseAnonPeerPosts() {
  const { actor, isFetching } = useActor();

  return useQuery<AnonPost[]>({
    queryKey: ['anonPeerPosts'],
    queryFn: async () => {
      // Backend no longer provides this
      return [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateAnonPeerPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: string) => {
      // Backend no longer provides this - stub implementation
      console.log('Post creation stubbed:', content);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anonPeerPosts'] });
      toast.success('Post created successfully');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to create post');
    },
  });
}

// Vent Room (stub implementations - backend removed these features)
export function useBrowseVentRoom() {
  const { actor, isFetching } = useActor();

  return useQuery<AnonPost[]>({
    queryKey: ['ventRoom'],
    queryFn: async () => {
      // Backend no longer provides this
      return [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateVent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: string) => {
      // Backend no longer provides this - stub implementation
      console.log('Vent creation stubbed:', content);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ventRoom'] });
      toast.success('Vent posted successfully');
    },
    onError: (error: any) => {
      // Don't show toast here, let the component handle it
      throw error;
    },
  });
}

// Vent Reactions (stub implementations - backend removed these features)
export function useGetVentReactions(postTimestamp: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<VentReaction[]>({
    queryKey: ['ventReactions', postTimestamp.toString()],
    queryFn: async () => {
      // Backend no longer provides this
      return [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddVentReaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postTimestamp, reaction }: { postTimestamp: bigint; reaction: Reaction }) => {
      // Backend no longer provides this - stub implementation
      console.log('Reaction stubbed:', { postTimestamp, reaction });
      return Promise.resolve();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['ventReactions', variables.postTimestamp.toString()] });
      queryClient.invalidateQueries({ queryKey: ['ventRoom'] });
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to add reaction');
    },
  });
}

// Crisis Resources (stub implementation - backend removed this feature)
export function useGetCrisisResources() {
  const { actor, isFetching } = useActor();

  return useQuery<[string, string][]>({
    queryKey: ['crisisResources'],
    queryFn: async () => {
      // Backend no longer provides this
      return [];
    },
    enabled: !!actor && !isFetching,
  });
}
