import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { ContentService, BlogMeta } from '../../services/content.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [RouterLink, MarkdownComponent],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css',
})
export class BlogDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private contentService = inject(ContentService);

  meta = signal<BlogMeta | null>(null);
  markdownContent = signal<string>('');
  loading = signal(true);

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';

    this.contentService.getBlogPosts().subscribe((posts) => {
      const post = posts.find((p) => p.slug === slug) ?? null;
      this.meta.set(post);
    });

    this.contentService.getBlogMarkdown(slug).subscribe((raw) => {
      const { content } = this.contentService.parseFrontmatter(raw);
      this.markdownContent.set(content);
      this.loading.set(false);
    });
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
