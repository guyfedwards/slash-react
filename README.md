# slash-react
A lambda function for a slack slash command to allow easy reactions to messages without using the mouse.

## Usage
```
/react :poop: :partyparrot: 3
```

Uses user token for api as bot users cannot get conversation history (TODO: seems like bots can have `channel:history` permissions)

## Steps
#### Create new slack app
Go to api.slack.com/apps > 'Create New App'

#### Add new slash command
In your newly created app, add a slash command pointing to the lambda url

#### Install app into workspace
Click on 'Install app' in LHS menu to add it to the workspace

#### Ngrok to localhost (127.0.0.1 if ngrok issues)
```
$ ngrok http 127.0.0.1:PORT
```
This will give you a url you can add to the slash command
