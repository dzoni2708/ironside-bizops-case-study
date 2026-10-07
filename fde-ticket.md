# Recap agent: three changes a skill file can't make

**1. Cut the transcript when the last client leaves the call.**
In two of three transcripts, recording continued after the client left, capturing side comments and pasted DMs. The old agent put a client's private message about our fees into a recap for the client's channel ([bad-recap.md](workers/output/bad-recap.md)). The new skill left it out in a rerun ([after-recap.md](workers/output/after-recap.md)), but only because the model obeyed.

**2. Block the post when a recap fails basic checks.**
An action item without an owner or due date, a typed performance figure (GMV, ad spend, affiliates, retention), or text from after the client left should stop the post. Today nothing does.

**3. Post within 15 minutes of the call ending.**
Recaps take 45–91 minutes (median 65) and make the hour 49% of the time ([calls.csv](calls.csv)). South skips the agent because of it ([slack-thread.txt](slack-thread.txt)).
