import '@logseq/libs'

async function setPriority(priority: string) {
    const { content, uuid } = await logseq.Editor.getCurrentBlock()
    let newContent = content;
    const p = `[#${priority}]`;
    const regex = /\[#[A,B,C]\]/;
    if (!content) {
        newContent = `TODO ${p} `;
    }
    //add todo if not present
    else if (!content.startsWith("TODO") &&
        !content.startsWith("DOING") &&
        !content.startsWith("DONE") &&
        !content.startsWith("NOW") &&
        !content.startsWith("LATER")) {
        //setPriority
        if (newContent.match(regex)) {
            newContent = newContent.replace(regex, p);
        }
        else {
            newContent = `${p} ${newContent}`;
        }
        //set TODO
        newContent = `TODO ${newContent}`;
    }
    else {
        newContent = newContent.replace(regex, p);
    }

    await logseq.Editor.updateBlock(uuid, newContent);
}

async function main() {
    logseq.Editor.registerSlashCommand('P1 TODO', () => setPriority("A"))
    logseq.Editor.registerSlashCommand('P2 TODO', () => setPriority("B"))
    logseq.Editor.registerSlashCommand('P3 TODO', () => setPriority("C"))
}

// bootstrap
logseq.ready(main).catch(console.error)
