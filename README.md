# node.js_RS-school
course on node.js on Rs school

params in command line 
(-s || --shift <value>int) example -s 2 

(-i || --input <value>str path to file) example -i ./input.txt 

(-o || --output <value>str path to output) example -o ./output.txt 

(-s || --action <value>str decode | encode) example decode 

node index.js -s 1 -s ./input.txt -o ./output.txt -a decode

You can start app without adding input and output path

node index.js -s 1 -a decode  "some text"
