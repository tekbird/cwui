package cwui.backend.app;

import java.io.File;
import java.io.FileFilter;
import java.nio.file.LinkOption;
import java.nio.file.Paths;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import cwui.backend.models.FileMetadata;
import cwui.backend.models.FileTypes;

@Path("files")
public class FileBrowser {
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public FileMetadata[] getFiles(@QueryParam("parent") String parentDirectory) {

		final Boolean skipDotted = parentDirectory.equals(null) || parentDirectory.equals("");

		if (skipDotted) {
			parentDirectory = System.getProperty("user.home");
		}

		if (parentDirectory != null) {
			java.nio.file.Path parentPath = Paths.get(parentDirectory);
			if (java.nio.file.Files.exists(parentPath, LinkOption.NOFOLLOW_LINKS)) {
				File parentFolder = new File(parentDirectory);
				File[] listOfFiles = parentFolder.listFiles(new FileFilter() {
					@Override
					public boolean accept(File file) {
						if (skipDotted && file.getName().startsWith(".")) {
							return false;
						}
						return !file.isHidden();
					}
				});
				FileMetadata[] result = new FileMetadata[listOfFiles.length];
				for (int i = 0; i < listOfFiles.length; i++) {
					File currentFile = listOfFiles[i];
					FileMetadata metadata = new FileMetadata();
					metadata.setName(currentFile.getName());
					metadata.setFileType(currentFile.isDirectory() ? FileTypes.Directory : FileTypes.File);
					metadata.setFullPath(currentFile.getAbsolutePath());
					result[i] = metadata;
				}
				return result;
			}
		}

		return null;
	}
}
