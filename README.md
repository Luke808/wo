public class CSVFileWriter {
    private BufferedWriter writer;

    @Setter
    private CSVFormat format = CSVFormat.DEFAULT;
    private CSVFormat dataFormat;
    @Setter
    private String pathName;
    @Setter
    private String fileName;
    @Setter
    private String fileCharsetName = "UTF-8";

    protected String lineSeparator = "\r\n";

    //初始行号
    protected int initFileLines = 1;
    //文件行数，表示文件当前写入的行序号。从1开始，
    @Getter
    private int fileLines = initFileLines;

    @Setter
    private int flushNum = 50000;

    private int lineNum = 0;
