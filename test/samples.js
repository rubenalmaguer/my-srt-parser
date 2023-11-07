export default {
  truncated: [
    `
14
49,2 --> 50,7
¿Es buena la solución que dio HYBE?

15
1:50,81 --> 1:53,62
Hay fans que dice que no es cuestión que devuelvan el dinero.

16
2:00:53,695 --> 2:00:55,753
Sino tener el producto en condiciones.

`,
    [
      {
        id: "14",
        startMS: 49200,
        endMS: 50700,
        text: "¿Es buena la solución que dio HYBE?",
      },
      {
        id: "15",
        startMS: 110810,
        endMS: 113620,
        text: "Hay fans que dice que no es cuestión que devuelvan el dinero.",
      },
      {
        id: "16",
        startMS: 7253695,
        endMS: 7255753,
        text: "Sino tener el producto en condiciones.",
      },
    ],
  ],

  basic: [
    `
14
00:00:49,242 --> 00:00:50,717
¿Es buena la solución que dio HYBE?

15
00:01:50,817 --> 00:01:53,628
Hay fans que dice que no es cuestión que devuelvan el dinero.

16
02:00:53,695 --> 02:00:55,753
Sino tener el producto en condiciones.

`,
    [
      {
        id: "14",
        startMS: 49242,
        endMS: 50717,
        text: "¿Es buena la solución que dio HYBE?",
      },
      {
        id: "15",
        startMS: 110817,
        endMS: 113628,
        text: "Hay fans que dice que no es cuestión que devuelvan el dinero.",
      },
      {
        id: "16",
        startMS: 7253695,
        endMS: 7255753,
        text: "Sino tener el producto en condiciones.",
      },
    ],
  ],

  webvttRegion: `WEBVTT
Region: id=fred

00:01.000 --> 00:02.000
I'm a basic cue.

00:02.000 --> 00:04.000
I'm another basic cue.

00:02. --> 00:04.000
Bad cue.
`,

  webvttNotes: `

WEBVTT - Translation of that film I like

NOTE
This translation was done by Kyle so that
some friends can watch it with their parents.

1
00:02:15.000 --> 00:02:20.000
- Ta en kopp varmt te.
- Det är inte varmt.

2
00:02:20.000 --> 00:02:25.000
- Har en kopp te.
- Det smakar som te.

NOTE This last line may not translate well.

3
00:02:25.000 --> 00:02:30.000
- Ta en kopp

`,

  webvttFormatted: `
WEBVTT

0:00:00.000 --> 0:00:05.000
<b>Bold Text</b>
<i>Italic Text</i>
<u>Underlined Text</u>

0:00:06.000 --> 0:00:10.000
This is a sample WebVTT file.

0:00:11.000 --> 0:00:15.000 align:left
Left-aligned Text

0:00:16.000 --> 0:00:20.000 align:right
Right-aligned Text

0:00:21.000 --> 0:00:25.000 align:center
Center-aligned Text

0:00:26.000 --> 0:00:30.000 position:10%,line:90%
Positioned Text (10% from the left, 90% from the top)

0:00:31.000 --> 0:00:35.000 size:50%
Text with 50% font size

0:00:36.000 --> 0:00:40.000 color:violet
Text in violet color

0:00:41.000 --> 0:00:45.000
<font color="blue">This text uses a custom color</font>

0:00:46.000 --> 0:00:50.000
<i>This is a new paragraph.<br>This text is on a new line.</i>

0:00:51.000 --> 0:00:55.000 vertical:lr
Vertical writing mode (left-to-right)

0:00:56.000 --> 0:01:00.000 vertical:rl
Vertical writing mode (right-to-left)

`,
};
