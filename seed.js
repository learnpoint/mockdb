import * as path from "https://deno.land/std@0.112.0/path/mod.ts";
import './datetime.js';


const readLines = f => Deno.readTextFileSync(f).toString().split("\n").map(l => l.trim());
const id = i => i + 1;
const j = f => path.join(Deno.cwd(), 'data', f);
const randomId = arr => Math.floor(Math.random() * arr.length) + 1;

const db = {};
const files = { users: j('users'), courses: j('courses'), posts: j('posts'), comments: j('comments'),addresses: j('addresses'), jsonOutput: j('../db.json'), jsOutput: j('../db.js') };

const addresses =  readLines(files.addresses).map(li => {
    return {
        street: li.split(",")[0].trim(),
        city: li.split(",")[1].trim(),
        zipcode: li.split(",")[2].trim(),
        country: li.split(",")[3].trim(),    
    };
});

const users = readLines(files.users);
db.users = users.map((li, i) => {
    return {
        id: id(i),
        name: li,
        first_name: li.split(" ")[0].trim(),
        last_name: li.split(" ")[1].trim(),
        display_name: li.split(" ")[0].trim() + " " + li.split(" ")[1].trim()[0],
        email: `${li.split(" ")[0].toLowerCase()}.${li.split(" ")[1].toLowerCase()}@fakepoint.net`,
        telephone: '072-565698' + i,                     
        street: addresses[i].street,
        city: addresses[i].city,
        zipcode: addresses[i].zipcode,
        country: addresses[i].country,
        created_at: 1..yearsAgo() - i.months(),
        updated_at: 1..yearsAgo() - i.weeks(),
        image_url: `https://raw.githubusercontent.com/learnpoint/mockdb/main/user-images/${id(i)}.jpg`,
    };
});

const courses = readLines(files.courses);
db.courses = courses.map((li, i) => {
    return {
        id: id(i),
        name: li,
        start_date: (i - 2).monthsAgo(),
        end_date: (i - 2).monthsAgo() + 3..months(),
        created_at: i.monthsAgo(),
        updated_at: i.weeksAgo()
    };
});

const posts = readLines(files.posts);
db.posts = posts.map((li, i) => {
    return {
        id: id(i),
        title : li.split(' ').slice(0,4).join(' '),
        title: li.split('.')[0].split(' ').slice(0, 3).join(' '),
        content: li,
        course_id: randomId(db.courses),
        user_id: randomId(db.users),
        created_at: i.daysAgo() - i.hours() - i.minutes(),
        updated_at: i.daysAgo() - i.hours(),
    };
});

const comments = readLines(files.comments);
db.comments = comments.map((li, i) => {
    return {
        id: id(i),
        content: li,
        post_id: randomId(db.posts),
        user_id: randomId(db.users),
        created_at: i.daysAgo() - i.hours() - i.minutes(),
        updated_at: i.daysAgo() - i.hours(),
    };
});

Deno.writeTextFileSync(files.jsonOutput, JSON.stringify(db, null, 4), 'utf-8');
Deno.writeTextFileSync(files.jsOutput, 'export const db = ' + JSON.stringify(db, null, 4), 'utf-8');
