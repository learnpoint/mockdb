# mockdb

*A mock database with common Learnpoint entities.*

## Using mockdb

**Fetch**

```js
const res = await fetch('https://cdn.jsdelivr.net/gh/learnpoint/mockdb/db.json');
const db = await res.json();
```

**Import**

```js
import { db } from 'https://cdn.jsdelivr.net/gh/learnpoint/mockdb/db.js';
```

## Modify mockdb

1. Modify files in the ```data``` folder.
2. Seed database: ```deno run -A seed.js```
