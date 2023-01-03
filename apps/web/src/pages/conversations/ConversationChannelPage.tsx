import { ConversationChannelLayout } from 'components/layouts/ConversationChannelLayout'
import { MessagePanel } from 'components/messages/MessagePanel'
import React from 'react'

export default function ConversationChannelPage() {
  return (
    <ConversationChannelLayout>
      <MessagePanel />
    </ConversationChannelLayout>
  )
}
