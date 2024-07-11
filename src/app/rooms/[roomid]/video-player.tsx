"use client";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { Room } from "@/db/schema";
import {
  Call,
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { genrateTokenAction } from "./actions";

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;

export const HelpADevVideoPlayer = ({
  room,
  userId,
}: {
  room: Room;
  userId: string;
}) => {
  if (!room) {
    return;
  }
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: userId,
      },
      tokenProvider: () => genrateTokenAction(),
    });
    setClient(client);
    const call = client.call("default", room.userId);
    call.join({ create: true });
    setCall(call);

    return () => {
      call.leave();
      client.disconnectUser();
    };
  }, [userId, room]);

  return (
    client &&
    call && (
      <StreamVideo client={client}>
        <StreamTheme>
          <StreamCall call={call}>
            <SpeakerLayout />
            <CallControls />
          </StreamCall>
        </StreamTheme>
      </StreamVideo>
    )
  );
};