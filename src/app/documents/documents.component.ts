import { Component, OnInit } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Document } from './Document.model';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  faTrash = faTrashAlt;

  constructor() { }

  ngOnInit() {
  }

  documents: Document[] = [new Document('test_document', 'sudipta', '5kb')];

}
