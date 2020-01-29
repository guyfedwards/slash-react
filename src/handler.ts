import * as qs from 'querystring'
import { WebClient, WebAPICallResult } from '@slack/web-api'
import { splitText } from './utils'

const web = new WebClient()

interface Message {
  ts: string
}

export const hello = async event => {
  const body = qs.parse(event.body)
  const textArray = splitText(body.text as string)
  let [index, ...emojis] = textArray.reverse()
  const parsedIndex = parseInt(index, 10)

  // if the index is not provided then the text is all emoji
  if (isNaN(parsedIndex)) {
    emojis = textArray
  }

  const msgIndex = isNaN(parsedIndex) ? 0 : parsedIndex

  console.log('INFO: ', body)
  console.log(`INFO: msgIndex=${msgIndex} emoji=${emojis}`, )

  const { messages } = await web.conversations.history({
    channel: body.channel_id as string,
    limit: msgIndex + 1,
    token: process.env.USER_TOKEN
  })

  const msgTs = (messages as Message[])[msgIndex].ts

  const cleanedEmojis = Array.isArray(emojis)
    ? emojis.filter(Boolean)
    : [emojis]

  let requests: Promise<WebAPICallResult>[] = []

  for (let emoji of cleanedEmojis) {
    console.log('Emoji name: ', emoji.replace(/:/g, ''))
    requests.push(web.reactions.add({
      channel: body.channel_id as string,
      name: emoji.replace(/:/g, ''),
      timestamp: msgTs,
      token: process.env.BOT_TOKEN
    }))
  }

  await Promise.all(requests)

  return {
    statusCode: 200
  };
};

