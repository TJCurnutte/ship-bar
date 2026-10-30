import json,re,html,statistics as st
e=html.escape;B='/workspace/shipbar/bench/';S='/workspace/shipbar/site/'
C=json.load(open(B+'cohort.json'));R=json.load(open(B+'rounds.json'))
ks=list(R);med={k:st.median(R[k]['scores']) for k in ks}
head="".join(f"<th>{k}</th>" for k in ks)
rows="".join(f"<tr><td>{i+1:02d} {e(n)}</td>"+"".join(f"<td class='n'>{R[k]['scores'][i]:.1f}</td>" for k in ks)+"</tr>" for i,(n,_) in enumerate(C))
rows+="<tr><td><b>median</b></td>"+"".join(f"<td class='n'><b>{med[k]:.2f}</b></td>" for k in ks)+"</tr><tr><td><b>blockers</b></td>"+"".join(f"<td class='n'>{len(R[k]['blockers'])}</td>" for k in ks)+"</tr>"
hist="".join(f"<li><b>{k} · median {med[k]:.2f} · {len(R[k]['blockers'])} blocker{'s' if len(R[k]['blockers'])!=1 else ''} · {'pass' if med[k]>=9.7 and not R[k]['blockers'] else 'fail'}</b><p>Measured: {e(R[k]['measure'])}.</p>"+(f"<p>Blockers: {e('; '.join(R[k]['blockers']))}.</p>" if R[k]['blockers'] else "")+f"<p>Top fixes, ranked:</p><ul>{''.join('<li>'+e(x)+'</li>' for x in R[k]['top'])}</ul></li>" for k in ks)
last=ks[-1]
sec=f'''<h2 id="ran">we ran it on this page</h2><p>A page about a benchmark should pass it. These are the real scores from running the 20-reviewer cohort on this site, round by round. The measurements came from headless Chrome and Lighthouse on the live URL. The reviewer judgments in these rounds were done by one agent working through each lens in turn, not by 20 separate models, and the table says exactly what they said.</p>
<ol class="h">{hist}</ol><div class="t"><table><thead><tr><th>reviewer</th>{head}</tr></thead><tbody>{rows}</tbody></table></div>'''
s=open(S+'index.html').read()
s=re.sub(r'<!--RAN-->.*?<!--/RAN-->','<!--RAN-->'+sec+'<!--/RAN-->',s,flags=re.S)
if 'ol.h{' not in s: s=s.replace('</style>','ol.h{padding-left:20px}ol.h li{margin:12px 0}ol.h p{margin:2px 0;font-size:15px;color:var(--m)}</style>')
# JSON-LD FAQ add
m=re.search(r'<script type="application/ld\+json">(.*?)</script>',s,re.S);ld=json.loads(m.group(1))
faq=ld[1]['mainEntity'];faq[:]=[q for q in faq if q['name'] not in('Did this page pass its own benchmark?','How does the 20-reviewer cohort decide?')]
faq+= [{"@type":"Question","name":"How does the 20-reviewer cohort decide?","acceptedAnswer":{"@type":"Answer","text":"Each of 20 narrow-lens reviewers scores out of 10 and can flag blockers. The final score is the median. Nothing ships under 9.7 or with any open blocker."}},
{"@type":"Question","name":"Did this page pass its own benchmark?","acceptedAnswer":{"@type":"Answer","text":" ".join(f"Round {k[1:]}: median {med[k]:.2f}, {len(R[k]['blockers'])} blockers." for k in ks)}}]
ld[0]['dateModified']=ld[2]['dateModified']=R[last]['date']
s=s[:m.start(1)]+json.dumps(ld)+s[m.end(1):]
open(S+'index.html','w').write(s)
# html faq visible too
L=open(S+'llms.txt').read().split('## Links')[0]
L=re.sub(r'- Cohort:.*?\n','',L);L=re.sub(r'- Self-test:.*?\n','',L)
L=L.replace('## Key facts\n','## Key facts\n- Cohort: 20 narrow-lens reviewers score independently; final score is the median; ship only at median 9.7+ with zero blockers.\n- Self-test: this page was run through its own cohort. '+" ".join(f"Round {k[1:]}: median {med[k]:.2f}, {len(R[k]['blockers'])} blockers." for k in ks)+'\n')
open(S+'llms.txt','w').write(L+"## Links\n- [Method page](https://ship-bar.neural-forge.io/)\n- [Self-test results](https://ship-bar.neural-forge.io/#ran)\n- [SKILL.md (plain text)](https://ship-bar.neural-forge.io/skill.md)\n")
print(med)
