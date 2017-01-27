var Numbers = Math.random();
Numbers = Numbers * 10000;
Numbers = Math.ceil(Numbers);

function validatesub()
{
if ((document.subs.update[0].checked==false) &&  (document.subs.update[1].checked==false))
	{
alert("Please check the checkbox to subscribe the ezine.");

return false;
	}
else
if ((document.subs.name.value=="") || (document.subs.email.value=="") )
{
	alert("Please fill both the fields.");

return false;
}
else
	{
	return emailCheck(document.subs.email.value);
	}

}

function validatesubok()
{
if ((document.subs.update[0].checked==false) &&  (document.subs.update[1].checked==false)&&  (document.subs.update[2].checked==false))
	{
alert("Please check the checkbox to subscribe the ezine.");

return false;
	}
else

if ((document.subs.name.value=="") || (document.subs.email.value=="") )
{
	alert("Please fill both the fields.");

return false;
}
else
	{
	return emailCheck(document.subs.email.value);
	}

}




<!-- Begin
function emailCheck (emailStr) {

/* The following variable tells the rest of the function whether or not
to verify that the address ends in a two-letter country or well-known
TLD.  1 means check it, 0 means don't. */

var checkTLD=1;

/* The following is the list of known TLDs that an e-mail address must end with. */

var knownDomsPat=/^(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum)$/;

/* The following pattern is used to check if the entered e-mail address
fits the user@domain format.  It also is used to separate the username
from the domain. */

var emailPat=/^(.+)@(.+)$/;

/* The following string represents the pattern for matching all special
characters.  We don't want to allow special characters in the address. 
These characters include ( ) < > @ , ; : \ " . [ ] */

var specialChars="\\(\\)><@,;:\\\\\\\"\\.\\[\\]";

/* The following string represents the range of characters allowed in a 
username or domainname.  It really states which chars aren't allowed.*/

var validChars="\[^\\s" + specialChars + "\]";

/* The following pattern applies if the "user" is a quoted string (in
which case, there are no rules about which characters are allowed
and which aren't; anything goes).  E.g. "jiminy cricket"@disney.com
is a legal e-mail address. */

var quotedUser="(\"[^\"]*\")";

/* The following pattern applies for domains that are IP addresses,
rather than symbolic names.  E.g. joe@[123.124.233.4] is a legal
e-mail address. NOTE: The square brackets are required. */

var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;

/* The following string represents an atom (basically a series of non-special characters.) */

var atom=validChars + '+';

/* The following string represents one word in the typical username.
For example, in john.doe@somewhere.com, john and doe are words.
Basically, a word is either an atom or quoted string. */

var word="(" + atom + "|" + quotedUser + ")";

// The following pattern describes the structure of the user

var userPat=new RegExp("^" + word + "(\\." + word + ")*$");

/* The following pattern describes the structure of a normal symbolic
domain, as opposed to ipDomainPat, shown above. */

var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$");

/* Finally, let's start trying to figure out if the supplied address is valid. */

/* Begin with the coarse pattern to simply break up user@domain into
different pieces that are easy to analyze. */

var matchArray=emailStr.match(emailPat);

if (matchArray==null) {

/* Too many/few @'s or something; basically, this address doesn't
even fit the general mould of a valid e-mail address. */

alert("Email address seems incorrect (check @ and .'s)");
return false;
}
var user=matchArray[1];
var domain=matchArray[2];

// Start by checking that only basic ASCII characters are in the strings (0-127).

for (i=0; i<user.length; i++) {
if (user.charCodeAt(i)>127) {
//alert("Ths username contains invalid characters.");
alert("Ths Email contains invalid characters.");
return false;
   }
}
for (i=0; i<domain.length; i++) {
if (domain.charCodeAt(i)>127) {
//alert("Ths domain name contains invalid characters.");
alert("Ths Email contains invalid characters.");
return false;
   }
}

// See if "user" is valid 

if (user.match(userPat)==null) {

// user is not valid

//alert("The username doesn't seem to be valid.");
alert("The Email doesn't seem to be valid.");
return false;
}

/* if the e-mail address is at an IP address (as opposed to a symbolic
host name) make sure the IP address is valid. */

var IPArray=domain.match(ipDomainPat);
if (IPArray!=null) {

// this is an IP address

for (var i=1;i<=4;i++) {
if (IPArray[i]>255) {
alert("Destination IP address is invalid!");
return false;
   }
}
return true;
}

var atomPat=new RegExp("^" + atom + "$");
var domArr=domain.split(".");
var len=domArr.length;
for (i=0;i<len;i++) {
if (domArr[i].search(atomPat)==-1) {
alert("The domain name does not seem to be valid.");
alert("The Email does not seem to be valid.");
return false;
   }
}

/* domain name seems valid, but now make sure that it ends in a
known top-level domain (like com, edu, gov) or a two-letter word,
representing country (uk, nl), and that there's a hostname preceding 
the domain or country. */

if (checkTLD && domArr[domArr.length-1].length!=2 && 
domArr[domArr.length-1].search(knownDomsPat)==-1) {
alert("The address must end in a well-known domain or two letter " + "country.");
return false;
}

// Make sure there's a host name preceding the domain.

if (len<2) {
alert("This Email address is missing a hostname!");
return false;
}

// If we've gotten this far, everything's valid!
return true;
}

//  End -->
document.write('<table border=0 cellpadding=0 cellspacing=0 width=100%><tr valign=top><TD colspan=2 id=LeftPane vAlign=top width=155 bordercolor="#d3d3d3" bgcolor="#ffffff" align=center><TABLE bgColor="#ffffff" border=1 height=20 cellPadding=0 cellSpacing=0 width=100% align=center style="BORDER-COLLAPSE: collapse" bordercolor="#75c4f0"><TR><td width=5 style="BORDER-right: 0" bgcolor=#D9261C></td><TD align=left  bgcolor="#ffffff"><SPAN class=Headgs>&nbsp;&nbsp;&nbsp;Directory </SPAN></tr></tr></table></td></tr><tr><td></tD><td><!--<BR><HR noShade SIZE=1 width="98%">-->');

document.write('<TABLE border=1 borderColor=#B2DEF7 bgcolor=#F0F7FF cellPadding=0 cellSpacing=0 style="BORDER-COLLAPSE: collapse" width="100%" align=center>');
document.write('<TR><td width=5 bgcolor=#0094DE></td><TD width="97%">&nbsp;&nbsp;&nbsp;<A href="/application/index.htm"><FONT color=#000000 face=verdana size=1>Applications</FONT></A></TD></TR> ');
document.write('<TR><td width=5 bgcolor=#0094DE></td><TD width="97%">&nbsp;&nbsp;&nbsp;<A href="/audiocast/index.asp"><FONT color=#000000 face=verdana size=1>AudioCast</FONT></A></TD></TR> ');
//document.write('<TR><td width=5 bgcolor=#0094DE></td><TD width="97%">&nbsp;&nbsp;&nbsp;<A href="/books/index.htm"  ><FONT color=#000000 face=verdana size=1>Books </FONT></A> <font face=verdana size=1 color=red>(New)</font></TD></TR>');
document.write('<TR><td width=5 bgcolor=#0094DE></td><TD width="97%">&nbsp;&nbsp;&nbsp;<A href="/career/index.asp"><FONT color=#000000 face=verdana size=1>Careers</FONT></A></TD></TR>');
document.write('<TR><td width=5 bgcolor=#0094DE></td><TD width="97%">&nbsp;&nbsp;&nbsp;<A href="/company/index.asp"><FONT color=#000000 face=verdana size=1>Companies</FONT></A></TD></TR>');
//document.write('<TR><td width=5 bgcolor=#0094DE></td><TD width="97%">&nbsp;&nbsp;&nbsp;<A href="/regional/index.htm" ><FONT color=#000000 face=verdana size=1>Country Pages</FONT></A></TD></TR>');
document.write('<TR><td width=5 bgcolor=#0094DE></td><TD width="97%">&nbsp;&nbsp;&nbsp;<A href="/downloads/index.htm"><FONT color=#000000 face=verdana size=1>Downloads</FONT></A></TD></TR>');
document.write('<TR><td width=5 bgcolor=#0094DE></td><TD width="97%">&nbsp;&nbsp;&nbsp;<A href="/education/index.htm" ><FONT color=#000000 face=verdana size=1>Education</FONT></A></TD></TR>');
document.write('<TR><td width=5 bgcolor=#0094DE></td><TD width="97%">&nbsp;&nbsp;&nbsp;<A href="/events/index.asp"><FONT color=#000000 face=verdana size=1>Events</FONT></A></TD></TR>');
//document.write('<TR><td width=5 bgcolor=#0094DE></td><TD width="97%">&nbsp;&nbsp;&nbsp;<A href="/ezine/index.htm"><FONT color=#000000 face=verdana size=1>Ezine</FONT></A> <font face=verdana size=1 color=red>(New)</font></TD></TR>');
document.write('<TR><td width=5 bgcolor=#0094DE></td><TD width="97%">&nbsp;&nbsp;&nbsp;<A href="/magazine/index.htm"><FONT color=#000000 face=verdana size=1>GIS Development</FONT></A></font></TD></TR>');
document.write('<TR><td width=5 bgcolor=#0094DE></td><TD width="97%">&nbsp;&nbsp;&nbsp;<A href="/glossary/index.htm"><FONT color=#000000 face=verdana size=1>Glossary</FONT></A></TD></TR>');
document.write('<TR><td width=5 bgcolor=#0094DE></td><TD width="97%">&nbsp;&nbsp;&nbsp;<A href="/master/opinionbook.asp"><FONT color=#000000 face=verdana size=1>Guest Book</FONT></A></TD></TR>');
document.write('<TR><td width=5 bgcolor=#0094DE></td><TD width="97%">&nbsp;&nbsp;&nbsp;<A href="/history/index.htm"><FONT color=#000000 face=verdana size=1>History</FONT></A></TD></TR>');
document.write('<TR><td width=5 bgcolor=#0094DE></td><TD width="97%">&nbsp;&nbsp;&nbsp;<A href="/interview/index.htm"><FONT color=#000000 face=verdana size=1>Interviews</FONT></A></TD></TR>');
document.write('<TR><td width=5 bgcolor=#0094DE></td><TD width="97%">&nbsp;&nbsp;&nbsp;<A href="/news/index.asp"><FONT color=#000000 face=verdana size=1>News</FONT></A></TD></TR>');
document.write('<TR><td width=5 bgcolor=#0094DE></td><TD width="97%">&nbsp;&nbsp;&nbsp;<A href="/policy/index.htm"><FONT color=#000000 face=verdana size=1>Policy</FONT></A></TD></TR>');
document.write('<TR><td width=5 bgcolor=#0094DE></td><TD width="97%">&nbsp;&nbsp;&nbsp;<A href="/proceedings/index.htm" ><FONT color=#000000 face=verdana size=1>Proceedings</FONT></A></TD></TR>');
document.write('<TR><td width=5 bgcolor=#0094DE></td><TD width="97%">&nbsp;&nbsp;&nbsp;<A href="/professional/index.asp"><FONT color=#000000 face=verdana size=1>Professionals</FONT></A></TD></TR>');
document.write('<TR><td width=5 bgcolor=#0094DE></td><TD width="97%">&nbsp;&nbsp;&nbsp;<A href="/publications/index.htm"><FONT color=#000000 face=verdana size=1>Publications</FONT></A></TD></TR>');
//document.write('<TR><td width=5 bgcolor=#0094DE></td><TD width="97%">&nbsp;&nbsp;&nbsp;<A href="/master/sitemap.htm"><FONT color=#000000 face=verdana size=1>Site Map</FONT></A></TD></TR>');
document.write('<TR><td width=5 bgcolor=#0094DE></td><TD width="97%">&nbsp;&nbsp;&nbsp;<A href="/technology/index.htm" ><FONT color=#000000 face=verdana size=1>Technology</FONT></A></TD></TR><!--<TR><TD width="12%"><A href="/tenders/index.htm"><FONT color=#000000 face=verdana size=1>Tenders</FONT></A></TD></TR>-->');
document.write('<TR><td width=5 bgcolor=#0094DE></td><TD width="97%">&nbsp;&nbsp;&nbsp;<A href="/thesis/index.htm"><FONT color=#000000 face=verdana size=1>Thesis</FONT></A></TD></TR>');
document.write('<TR><td width=5 bgcolor=#0094DE></td><TD width="97%">&nbsp;&nbsp;&nbsp;<A href="/tutorials/index.htm"><FONT color=#000000 face=verdana size=1>Tutorials</FONT></A></TD></TR></table></td></tr></table>');

document.write('<br><center><a href="http://www.gisinstitute.net/" target="_blank"><img src="/adbanners/gisinst125.gif" border=0></a></center>');

//document.write('<br><center><a href=\"http://www.gisdevelopment.net/master/Trimble_Converge_India09.pdf" target=_blank><img src=\"/adbanners/trimblesep09W.gif\" border=1></a></center>');


//document.write('<br><center><a href=\"http://www.gisdev.net/cgi-bin/jump.cgi?f=gisdevelopment&ref=http://www.gisdevelopment.net/master/Trimble_Converge_India09.pdf" target=_blank><img src=\"/adbanners/trimblesep09W.gif\" border=1></a></center>');


document.write('	<center><br><TABLE bgColor="#ffffff" border=0 cellPadding=0 cellSpacing=0 width=100% align=center><TR><td width=5 style="BORDER-right: 0" bgcolor=#D9261C></td><td><TABLE bgColor="#ffffff" border=1 cellPadding=0 cellSpacing=0 width=99% align=center style="BORDER-COLLAPSE: collapse" bordercolor="#75c4f0"><TR height=18><TD align=left  bgcolor="#ffffff"><SPAN class=Head id=_ctl9__ctl0_ModuleTitle>&nbsp;&nbsp;&nbsp;Ezine</Span></tr></table></td></tr></tr></table><table border="1" cellpadding="3" cellspacing="0" width="99%%" style="BORDER-COLLAPSE: collapse" bordercolor="#75c4f0" bgcolor=#F0F7FF>');
document.write('<tr><td valign=top><font face="verdana" size="1">');
document.write('<form name=subs method=post action="/ezine/subscribe.asp" onSubmit="return validatesub()"><font face=verdana size=1><b>I want to subscribe:</b></font><br>');
document.write('<input type="checkbox" name="update" value="weekly">GIS Weekly <br>( <A href="/ezine/weekly/index.htm" title="view GIS Development Weekly"><font face=verdana size=1><b>GIS Weekly Archive</b></font></a> )<br>');
document.write('<input type="checkbox" name="update" value="publication">GIS Publications <br>( <A href="/ezine/publication/index.htm" title="view Publications"><font face=verdana size=1><b>Publications Archive</b></font></a> )<br>');




//document.write('<input type="checkbox" name="update" value="Mweekly">GIS Global Magazine<br><br>');

//document.write('<input type="checkbox" name="update" value="GlobalMagazine">GIS Global Magazine<br>( <A href="/ezine/global/index.htm" title="view Publications"><font face=verdana size=1><b>Archive</b></font></a> )<br><br>');

document.write('<input size=15 name=name value="Name"  onFocus="javascript:document.subs.name.value=\'\'"> ');
document.write('<input size=15 name=email value="Email"  title="Fill the Email" onFocus="javascript:document.subs.email.value=\'\'" onBlur= validateEmail(this)><br>');


document.write('<font face=verdana size=1>Fill the Numbers</font> <input name="TR_Numbers" size="6"  value="" maxlength="6">										<input type="hidden" name="hidNumbers" size="6"  value="<%=Numbers%>" maxlength="6">										<b><font size=2>');
document.write(document.subs.hidNumbers.value=Numbers); 
document.write('</font></b>');
document.write('<center><input class=button type=submit value="Subscribe" id=submit1 name=submit1></center>');
document.write('</FORM></td></tr></table><br></center>');


//document.write('<TABLE bgcolor=#F0F7FF border=0 bordercolor=#B2C0CA cellPadding=0 cellSpacing=0 style="BORDER-COLLAPSE: collapse" width="100%" align=center><TR><td> <TABLE bgColor="#ffffff" border=1 height=20 cellPadding=0 cellSpacing=0 width=100% align=center style="BORDER-COLLAPSE: collapse" bordercolor="#75c4f0"><TR><td width=5 style="BORDER-right: 0" bgcolor=#D9261C></td><TD align=left  bgcolor="#ffffff"><SPAN class=Headgs>&nbsp;&nbsp;&nbsp;Search </SPAN></tr></tr></table><FORM action=http://www.google.com/custom method=get name=form1><table cellspacing=0 width=100% cellpadding=0 border=1 style="BORDER-COLLAPSE: collapse" bordercolor="#75c4f0" ><tr><td align=center><A href="http://www.google.com/search"><IMG align=center alt=Google border=0 src="/images/google.gif"></A><br><INPUT maxLength=255 name=q size=13> <INPUT name=sa  class=button type=submit value=Go> <INPUT name=cof size=7 type=hidden value=GIMP:Darkindianred;T:Black;LW:80;ALC:indianred;L:http://www.gisdevelopment.net/images/gisd.gif;GFNT:LightSlateGray;LC:navyblue;LH:96;BGC:White;AH:center;VLC:Brown;GALT:Midnightindianred;AWFID:95903ccf083b52f5;> <INPUT name=domains size=7 type=hidden value=gisdevelopment.net><INPUT CHECKED name=sitesearch size=7 type=hidden value=gisdevelopment.net></td></tr></table></td></tr></table> </FORM>');


document.write('</td><td width=5></td><td width=1 bgcolor=#75c4f0></td>');


