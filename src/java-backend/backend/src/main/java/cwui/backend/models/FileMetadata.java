package cwui.backend.models;

public class FileMetadata {

	private String name;
	private FileTypes fileType;
	private String fullPath;

	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public FileTypes getFileType() {
		return fileType;
	}

	public void setFileType(FileTypes fileType) {
		this.fileType = fileType;
	}

	public void setFullPath(String absolutePath) {
		this.fullPath = absolutePath;
	}
	
	public String getFullPath() {
		return this.fullPath;
	}
}
